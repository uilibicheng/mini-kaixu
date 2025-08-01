// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  jumpToJobIntention() {
    wx.navigateTo({
      url: '/pages/jobIntention/jobIntention'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})