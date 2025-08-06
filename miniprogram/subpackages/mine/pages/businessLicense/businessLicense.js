import userApi from "../../../../api/user"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    licenseImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getQualifications()
  },

  async getQualifications() {
    const res = await userApi.getQualifications()
    console.log('res', res);
    this.setData({
      licenseImg: res.configValue
    })
  },
})