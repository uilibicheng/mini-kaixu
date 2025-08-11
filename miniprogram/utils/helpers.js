import { STORAGE } from '@/config/constants'
import { queryString } from './util'
import loginApi from '@/api/login'
import router from './router'
import { TABBAR_ROUTE } from '../config/constants'
import userApi from '../api/user'


export function showToast({
  title = '',
  duration = 3000,
  icon = 'none',
  mask = false,
  image = '',
  callback,
}) {
  if (title) {
    wx.showToast({ title, duration, icon, mask, image })
    const timer = setTimeout(() => {
      callback && callback()
      clearTimeout(timer)
      wx.hideToast()
    }, duration)
  }
}

export function unfinishFunctionToast() {
  showToast({
    title: '火速开发中，敬请期待...'
  })
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}',
  )
}

export function goBack(delta) {
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

// 判断是否登录的回调操作
export function actionWithCheckLogin(option) {
  const flag = isLogin()
  if (flag) {
    option?.success && option.success()
  } else {
    if (option?.fail) {
      option.fail()
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

export async function getUserBaseInfo() {
  try {
    if (isLogin()) {
      const data = await userApi.getUserBaseInfo()
      await setUserBaseInfo(data)
    }
  } catch (error) {
    removeLoginStorage()
  }
}

export async function setUserBaseInfo(info) {
  return new Promise(resolve => {
    if (info) {
      wx.setStorageSync(STORAGE.USER_BASE_INFO, info)
    } else {
      removeLoginStorage()
    }
    resolve(info)
  })
}

export function getStorageUserBaseInfo() {
  const userBaseInfo = wx.getStorageSync(STORAGE.USER_BASE_INFO)
  return userBaseInfo
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

function slentLogin(code, url) {
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

export function redirectUrl(url) {
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

function goToLogin(url) {
  wx.navigateTo({
    url: `/pages/login/login?url=${encodeURIComponent(url)}`,
  })
}

export function removeLoginStorage() {
  wx.removeStorageSync(STORAGE.USER_TOKEN)
  wx.removeStorageSync(STORAGE.CURRENT_ROLE_TYPE)
  wx.removeStorageSync(STORAGE.USER_BASE_INFO)
}

export const getUrlParams = (url) => {
  const hashes = url.slice(url.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map(hash => {
    const [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })
  return params
}

export function isTabbar(route) {
  route = route.startsWith('/') ? route : `/${route}`
  return TABBAR_ROUTE.includes(route)
}

// 刷新当前页
export function refreshCurrentPage() {
  const curPages = getCurrentPages()
  console.log('curPages', curPages);
  const curIndex = curPages.length - 1
  if (curIndex > -1) {
    let route = curPages[curIndex].route
    if (route) {
      const methoddName = isTabbar(route) ? 'reLaunch' : 'redirectTo'
      console.log('methoddName', methoddName);
      wx[methoddName]({
        url: '/' + route,
      })
    }
  } else {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
}
