// pages/myWallet/pickDoudou/pickDoudou.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  handleScroll(e) {
    if (!this.data.isScroll && e.detail.scrollTop > 40) {
      this.setData({
        isScroll: true
      })
    }
    if (this.data.isScroll && e.detail.scrollTop <= 40) {
      this.setData({
        isScroll: false
      })
    }
  }
})