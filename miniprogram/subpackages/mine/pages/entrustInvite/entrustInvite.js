// subpackages/mine/pages/entrustInvite/entrustInvite.ts
import posterBehavior from '@/behaviors/posterBehavior'
import userApi from '../../../../api/user'

Page({
  behaviors: [posterBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    posterName: 'entrustInvite',
    shareImg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPoster()
  },

  async getPoster() {
    const res = await userApi.getPoster()
    console.log('res', res);
    this.setData({
      shareImg: res.configValue || ''
    })
  }
})