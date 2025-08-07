import userApi from "../../../../api/user"

// subpackages/mine/pages/privacySetting/privacySetting.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeSelectVisible: false,
    avatarVisibility: 0,
    nameVisibility: 0,
    resumeVisibility: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserPrivacy()
  },

  async getUserPrivacy() {
    const res = await userApi.getUserPrivacy()
    this.setData(res)
    console.log('res', res);
  },

  async setAvatarVisibility() {
    const avatarVisibility = this.data.avatarVisibility === 1 ? 0 : 1
    try {
      await userApi.setAvatarVisibility({avatarVisibility})
    } catch (error) {
      
    }
    this.getUserPrivacy()
  },

  async setNameVisibility() {
    const nameVisibility = this.data.nameVisibility === 1 ? 0 : 1
    try {
      await userApi.setAvatarVisibility({nameVisibility})
    } catch (error) {
      
    }
    this.getUserPrivacy()
  },

  handleToggleShowResumeModal() {
    this.setData({
      resumeSelectVisible: !this.data.resumeSelectVisible
    })
  },

  async setResumeVisibility(e) {
    const {type} = e.currentTarget.dataset
    try {
      await userApi.setResumeVisibility({
        resumeVisibility: type
      })
    } catch (error) {
      
    }
    this.getUserPrivacy()
    this.handleToggleShowResumeModal()
  }
})