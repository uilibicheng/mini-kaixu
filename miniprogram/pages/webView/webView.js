// pages/webView/webView.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },

  onLoad: async function (options) {
    console.log(333, options);
    if (options.url) {
      options.url = decodeURIComponent(options.url)
    }
    this.initWebview(options)
  },

  initWebview(options) {
    this.setData({
      url: options.url,
    })
  },
})