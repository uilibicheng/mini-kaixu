// subpackages/mine/pages/privacySecrecy/privacySecrecy.ts
import userApi from "../../../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacyImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPrivacy()
  },

  async getPrivacy() {
    const res = await userApi.getPrivacy()
    this.setData({
      privacyImg: res.configValue
    })
  },
})