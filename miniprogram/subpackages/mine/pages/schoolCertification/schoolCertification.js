import userApi from "../../../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSchoolVerify()
  },

  async getSchoolVerify() {
    const res = await userApi.getSchoolVerify()
    this.setData({
      img: res.configValue
    })
  },
})