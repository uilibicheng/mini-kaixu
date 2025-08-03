import router from "../../utils/router"

// pages/jobDetail/jobDetail.ts
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

  // 立即投诉
  handleComplaint() {
    router.navigateTo({
      url: '/subpackages/job/pages/complaintJob/complaintJob'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})