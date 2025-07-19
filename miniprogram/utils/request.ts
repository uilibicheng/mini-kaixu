import {
  API_kEY,
  APP_VERSION,
  DEFAULT_AREA_ID,
  DEFAULT_HOST,
  MINI_SOURCE,
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
import { IRequestOptions } from '@/config/interface/request'
import Tracker from '@/tracker/tracker'
import { PAGE_NUM } from '@/config/page'

const defaultHost: string = DEFAULT_HOST

function handleUrl(url: string): string {
  if (/^(https?:)?\/\//.test(url)) {
    return url
  } else {
    return defaultHost + url
  }
}

const errMsg: string = '网络连接出错，请稍后重试'

function getParams(data: object) {
  const systemInfo = wx.getDeviceInfo()
  const appBaseInfo = wx.getAppBaseInfo()
  const timestamp = Math.floor(Date.now())
  const userBaseInfo = getStorageUserBaseInfo()
  const ownerCode: number | string = wx.getStorageSync(STORAGE.OWNER_CODE) || ''
  const defaultParams = {
    deviceModel: systemInfo.model,
    deviceSystem: systemInfo.system,
    version: appBaseInfo.version,
    platform: systemInfo.platform,
    clientType: 'mini',
    appVersion: APP_VERSION,
    areaId: wx.getStorageSync(STORAGE.AREA_ID) || userBaseInfo.areaId || DEFAULT_AREA_ID,
    userToken: wx.getStorageSync(STORAGE.USER_TOKEN) || '',
    apiKey: API_kEY,
    appName: 'fenxiao_mina',
    timestamp,
    localTime: Math.floor(timestamp / 1000),
    ownerCode,
    miniSource: MINI_SOURCE,
  }
  return getValidParams(Object.assign({}, defaultParams, data))
}

export async function Request(options: IRequestOptions) {
  const hideLoading = options.hideLoading || false
  const silent = options.silent || false
  if (!hideLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
  }
  const reqUrl = handleUrl(options.url)
  const reqParams: any = getParams(options.data)
  const header = options.header || {}
  // get请求使用cookie传参，post则正常传参
  if (options.method === 'GET') {
    if (reqParams.userToken) {
      header['Cookie'] = `MINI_USER_COOKIE=${reqParams.userToken}`
    }
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
    const data: any = res.data
    if (res.statusCode === 200) {
      const { code } = data
      // 4001购物车为空 911限流
      if (+code === 200 || +code === 1) {
        hideLoadingAndShowToast(hideLoading)
        return Promise.resolve(data.data || {})
      } else {
        // 登录失效
        if (+code === 200001 || +code === 6000001) {
          removeLoginStorage()
          const app = getApp()
          if (!app.globalData.needLogin) {
            app.globalData.needLogin = true
            jumpToLogin(true)
          }
          return Promise.reject(data)
        }
        hideLoadingAndShowToast(hideLoading, silent, data.msg || errMsg)
        return Promise.reject(data)
      }
    } else {
      hideLoadingAndShowToast(hideLoading, silent, data.msg || errMsg)
      return Promise.reject(data)
    }
  } catch (error) {
    if (reqUrl.indexOf('/mini/data/report') < 0) {
      const err = error as any
      hideLoadingAndShowToast(hideLoading, silent, err.msg || errMsg)
      return Promise.reject(err)
    }
  }
}

function hideLoadingAndShowToast(
  hideLoading: boolean = false,
  silent: boolean = false,
  msg: string = '',
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
