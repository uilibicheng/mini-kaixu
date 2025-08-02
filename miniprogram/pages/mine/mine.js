// pages/mine/mine.ts
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import loginBehavior from "../../behaviors/loginBehavior"
import { isLogin } from "../../utils/helpers"

Page({
  behaviors: [messageBoxBehavior, loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.showMessagebox()
  },

  onShow() {
    this.setData({
      isLogin: isLogin()
    })
  },

  handleLoginSuccess() {
    this.onShow()
  }
})