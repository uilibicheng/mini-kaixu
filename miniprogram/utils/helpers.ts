import { STORAGE, } from '@/config/constants'
import { IShowToast } from '@/config/interface/helpers'
import { queryString } from './util'
import loginApi from '@/api/login'
import router from './router'


export function showToast({
  title = '',
  duration = 3000,
  icon = 'none',
  mask = false,
  callback,
}: IShowToast) {
  if (title) {
    wx.showToast({ title, duration, icon, mask })
    const timer = setTimeout(() => {
      callback && callback()
      clearTimeout(timer)
      wx.hideToast()
    }, duration)
  }
}

export function param2Obj(url: string): object {
  const search: string = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}',
  )
}

export function goBack(delta: number = 1) {
  const curPages = getCurrentPages()
  if (curPages && curPages.length <= 1) {
    wx.switchTab({
      url: '/pages/index/index',
      fail: () => {},
      complete: () => {},
    })
  } else {
    wx.navigateBack({
      delta: delta,
    })
  }
}

export function isLogin() {
  const userToken = wx.getStorageSync(STORAGE.USER_TOKEN)
  return !!userToken
}

// 判断是否登录的回调操作, isBind是需要登陆和绑定
export function actionWithCheckLogin(option?: {
  isBind?: Boolean
  success?: Function
  fail?: Function
}) {
  const flag = isLogin()
  if (flag) {
    option?.success && option.success()
  } else {
    if (option?.fail) {
      option.fail()
    } else {
      const userToken = wx.getStorageSync(STORAGE.USER_TOKEN)
      if (!userToken) {
        jumpToLogin()
      } else {
        // 去绑定
        if (isDifferentCompany()) {
          goBack()
        } else {
          const url = getCurrentPageUrl()
          router.navigateTo({
            url: `/pages/user/mailBoxBinding?url=${encodeURIComponent(url)}`,
          })
        }
      }
    }
  }
}

export function getCurrentPageUrl() {
  const curPages = getCurrentPages()
  let url = '/pages/index/index'
  if (curPages.length) {
    const curPage = curPages[curPages.length - 1]
    url = '/' + curPage.route
    const query = queryString(curPage.options, true)
    if (query) {
      url = url + '?' + query
    }
  }
  return url
}

export function tryLogin() {
  wx.login({
    success: res => {
      const code = res.code
      if (code) {
        removeLoginStorage()
        loginApi
          .login(
            {
              jsCode: code,
            },
            true,
          )
          .then(async res => {
            if (res && res.userToken) {
              await getUserBaseInfo(code, res.userToken)
              wx.setStorageSync(STORAGE.USER_TOKEN, res.userToken)
              let url = getCurrentPageUrl()
              actionWithCheckLogin({
                success: () => {
                  redirectUrl(url)
                },
              })
            }
          })
      }
    },
  })
}

export function jumpToLogin(silentLogn = false) {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(res => {
    // 检查小程序是否有新版本发布
    if (res.hasUpdate && !getApp().globalData.miniShowUpdateTip) return

    getApp().globalData.isLogin = false
    const url = getCurrentPageUrl()
    // 如果不需要静默登录，直接去登录页
    if (!silentLogn) {
      goToLogin(url)
      return
    }
    // 静默登录，如果返回token则登录成功，未返回则跳到登录页进行授权
    wx.login({
      success: res => {
        if (res.code) {
          removeLoginStorage()
          slentLogin(res.code, url)
        } else {
          goToLogin(url)
        }
      },
      fail: () => {
        goToLogin(url)
      },
    })
  })
}

function slentLogin(code: string, url: string) {
  loginApi
    .login({
      jsCode: code,
    })
    .then(async res => {
      getApp().globalData.needLogin = false
      if (res && res.userToken) {
        wx.setStorageSync(STORAGE.USER_TOKEN, res.userToken)

        actionWithCheckLogin({
          success: () => {
            redirectUrl(url)
          },
        })
      } else {
        goToLogin(url)
      }
    })
    .catch(() => {
      getApp().globalData.needLogin = false
      goToLogin(url)
    })
}

export function redirectUrl(url: string) {
  url = !url ? '/pages/index/index' : url
  const switchUrl = ['/pages/index/index', '/pages/cart/cart', '/pages/user/user']
  const method =
    switchUrl.findIndex(item => {
      return url.indexOf(item) > -1
    }) > -1
      ? 'reLaunch'
      : 'redirectTo'
  wx[method]({
    url,
  })
}

function goToLogin(url: string) {
  wx.navigateTo({
    url: `/pages/login/login?url=${encodeURIComponent(url)}`,
  })
}

export const getUrlParams = (url: string) => {
  const hashes = url.slice(url.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map(hash => {
    const [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })
  return params
}
