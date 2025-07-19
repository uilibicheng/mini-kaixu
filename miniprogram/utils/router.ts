import { getStorageKaiyunInfo, getStorageUserBaseInfo, getUserBaseInfo, showToast } from './helpers'

const pageList = [
  'pages/goodsDetail/goodsDetail',
  'pages/goodsList/goodsList',
  'pages/cart/cart',
  'pages/search/result',
]

export default {
  showError() {
    showToast({
      title: '网络出了点小差，请稍后重试',
    })
  },

  async beforeRouterLeave(callback: Function) {
    // 判断是否有baseInfo信息
    const kaiyunInfo = getStorageKaiyunInfo()
    if (!kaiyunInfo) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
      try {
        const data = await getUserBaseInfo()
        wx.hideLoading()
        if (!(data && data.kaiyunInfo)) {
          this.showError()
          return
        }
      } catch (error) {
        wx.hideLoading()
        this.showError()
        return
      }
    }

    callback && callback()
  },

  async navigateTo(params: any) {
    this.beforeRouterLeave(() => {
      // 判断传入的url是否以/开头，不是则加上
      if (params && params.url) {
        params.url = params.url.indexOf('/') === 0 ? params.url : '/' + params.url
      }
      const curPages = getCurrentPages()
      const curIndex = curPages.length - 1
      if (curPages && curPages.length) {
        const prevousPage = curPages[curIndex - 1] || {}
        if (
          prevousPage &&
          prevousPage.route &&
          !pageList.includes(prevousPage.route) &&
          params.url.indexOf(prevousPage.route) > -1
        ) {
          wx.navigateBack({
            delta: 1,
          })
        } else if (curPages.length >= 10) {
          wx.redirectTo(params)
        } else {
          wx.navigateTo(params)
        }
      }
    })
  },

  redirectTo(params: any) {
    this.beforeRouterLeave(() => {
      wx.redirectTo(params)
    })
  },
}
