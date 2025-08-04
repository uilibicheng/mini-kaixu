import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import userApi from "@/api/user"
import loginApi from "@/api/login"
import router from "@/utils/router"
import { removeLoginStorage, showToast } from "../../../../utils/helpers"

// subpackages/mine/pages/accountSetting/accountSetting.ts
Page({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  jumpToNotification() {
    router.navigateTo({
      url: '/subpackages/mine/pages/wechatNotification/wechatNotification'
    })
  },

  handleRemoveStorage() {
    wx.clearStorage({
      success: () => {
        showToast({
          title: '清除缓存',
          image: '/assets/images/icon/icon-toast-success.png'
        })
      }
    })
  },

  handleDeleteUser() {
    this.$messageBox({
      title: '注销账户',
      message: `确定要注销账户吗？注销后将不会保留您的任何信息，所有账户信息全部清除，请慎重考虑。`,
      messageColor: 'rgba(0,0,0,0.7)',
      showCancelButton: true,
      confirmButtonText: '确认注销',
      confirmBackground: '#F2505D',
      cancelButtonText: '取消',
      confirm: async () => {
        await userApi.deleteUser()
        showToast({
          title: '注销成功',
          image: '/assets/images/icon/icon-toast-success.png'
        })
      },
    })
  },

  handleLogout() {
    this.$messageBox({
      title: '退出登录',
      message: `确定要退出登录吗？`,
      messageColor: 'rgba(0,0,0,0.7)',
      showCancelButton: true,
      confirmButtonText: '确认',
      confirmBackground: '#F2505D',
      cancelButtonText: '取消',
      confirm: async () => {
        await loginApi.loginOut()
        removeLoginStorage()
        showToast({
          title: '退出登录成功',
          image: '/assets/images/icon/icon-toast-success.png',
          duration: 1500,
          callback: () => {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      },
    })
  }
})