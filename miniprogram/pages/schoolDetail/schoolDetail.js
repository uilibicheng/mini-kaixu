// pages/schoolDetail/schoolDetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  handleSwitchTab(e) {
    console.log('e', e);
    const {index} = e.detail.index ? e.detail : e.currentTarget.dataset
    if (this.data.tabIndex === index) return

    this.setData({
      tabIndex: index
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})