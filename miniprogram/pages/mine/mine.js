// pages/mine/mine.ts
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"

Page({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    loginVisible: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.showMessagebox()
  },

  showMessagebox() {
    this.$messageBox({
      title: '温馨提示',
      message: `请先完善一份简历\n一份完整的简历是您成功求职的良好开始！`,
      showCancelButton: true,
      confirmButtonText: '先逛一逛',
      cancelButtonText: '完善简历',
      confirm: async () => {
        
      },
    })
  }
})