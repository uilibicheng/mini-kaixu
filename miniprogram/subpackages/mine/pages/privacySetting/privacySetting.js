// subpackages/mine/pages/privacySetting/privacySetting.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarSwitch: false,
    nickNameSwitch: false,
    resumeSelectVisible: false,
    resumeSelectType: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  handleToggleShowResumeModal() {
    this.setData({
      resumeSelectVisible: !this.data.resumeSelectVisible
    })
  },

  handleSelectResumeType(e) {
    const {type} = e.currentTarget.dataset
    this.setData({
      resumeSelectType: type
    })
    this.handleToggleShowResumeModal()
  }
})