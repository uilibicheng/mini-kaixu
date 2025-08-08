// pages/myResume/qualificationCertificate/qualificationCertificate.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '保存',
      background: '#E2E2E2',
      color: '#fff',
      method: 'handleSave'
    },
    isSearch: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  toggleShowSearch() {
    this.setData({
      isSearch: !this.data.isSearch
    })
  }
})