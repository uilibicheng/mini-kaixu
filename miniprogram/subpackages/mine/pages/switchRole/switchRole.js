// subpackages/mine/pages/switchRole/switchRole.ts
import userApi from '../../../../api/user'
import {COLOR, STORAGE} from '../../../../config/constants'
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import { goBack, showToast } from '../../../../utils/helpers'

Page({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    roleType: null,
    currentTypeName: '',
    switchTypeName: ','
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const roleType = wx.getStorageSync(STORAGE.CURRENT_ROLE_TYPE)
    const currentTypeName = roleType === 1 ? '求职者' : '招聘者'
    const switchTypeName = roleType === 1 ? '招聘者' : '求职者'
    this.setData({
      roleType,
      currentTypeName,
      switchTypeName
    })
  },

  async switchRoleType() {
    const {roleType, switchTypeName} = this.data
    this.$messageBox({
      title: '温馨提示',
      message: `确定要切换到${switchTypeName}吗？`,
      showCancelButton: true,
      confirmButtonText: '确定',
      confirmBackground: roleType === 2 ? COLOR.INVITE_COLOR : COLOR.MAIN_COLOR,
      cancelButtonText: '取消',
      confirm: async () => {
        await userApi.switchRole({
          roleType: roleType === 1 ? 2 : 1
        })
        showToast({
          title: '切换成功',
          image: '/assets/images/icon/icon-toast-success.png',
          duration: 1500,
          callback: () => {
            goBack()
          }
        })
      },
    })
  }
})