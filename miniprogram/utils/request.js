import {
  DEFAULT_HOST,
  STORAGE,
} from '@/config/constants'
import {
  getStorageUserBaseInfo,
  jumpToLogin,
  removeLoginStorage,
  showToast,
} from './helpers'
import { getValidParams } from './util'
import wxp from './wxp'

const defaultHost = DEFAULT_HOST

function handleUrl(url) {
  if (/^(https?:)?\/\//.test(url)) {
    return url
  } else {
    return defaultHost + url
  }
}

const errMsg = '网络连接出错，请稍后重试'

function getParams(data) {
  const defaultParams = {
    userToken: wx.getStorageSync(STORAGE.USER_TOKEN) || '',
  }
  return getValidParams(Object.assign({}, defaultParams, data))
}

export async function Request(options) {
  const hideLoading = options.hideLoading || false
  const silent = options.silent || false
  if (!hideLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
  }
  const reqUrl = handleUrl(options.url)
  const reqParams = getParams(options.data)
  const header = options.header || {}
  // get请求使用cookie传参，post则正常传参
  if (reqParams.userToken) {
    header['token'] = reqParams.userToken
    delete reqParams.userToken
  }

  const opts = {
    url: reqUrl,
    data: reqParams,
    method: options.method || 'GET',
    header,
  }

  try {
    const res = await wxp.request(opts)
    console.log('res', res);
    const data = res.data
    if (res.statusCode === 200) {
      const { code } = data
      if (+code === 200) {
        hideLoadingAndShowToast(hideLoading)
        return Promise.resolve(data.data || {})
      } else {
        if (+code === 1001) {
          hideLoadingAndShowToast(false, true)
          return Promise.resolve(data || {})
        }
        // 登录失效
        // if (+code === 200001 || +code === 6000001) {
        //   removeLoginStorage()
        //   const app = getApp()
        //   if (!app.globalData.needLogin) {
        //     app.globalData.needLogin = true
        //     jumpToLogin(true)
        //   }
        //   return Promise.reject(data)
        // }
        hideLoadingAndShowToast(hideLoading, silent, data.msg || errMsg)
        return Promise.reject(data)
      }
    } else {
      hideLoadingAndShowToast(hideLoading, silent, data.msg || errMsg)
      return Promise.reject(data)
    }
  } catch (error) {
    if (reqUrl.indexOf('/mini/data/report') < 0) {
      const err = error
      hideLoadingAndShowToast(hideLoading, silent, err.msg || errMsg)
      return Promise.reject(err)
    }
  }
}

function hideLoadingAndShowToast(
  hideLoading = false,
  silent = false,
  msg = '',
) {
  wx.stopPullDownRefresh()
  if (!hideLoading) {
    wx.hideLoading()
  }
  if (!silent && msg) {
    if (msg && msg.length > 22) {
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#c6a47e',
      })
    } else {
      showToast({
        title: msg,
      })
    }
  }
}
