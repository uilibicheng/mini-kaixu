import { STORAGE } from '../config/constants'
import { Request } from '../utils/request'

export default {
  saveUserInfo(data, hideLoading = false) {
    return Request({
      url: '/applet/auth/saveUserInfo',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  switchRole(data, hideLoading = false) {
    console.log('data', data)
    return Request({
      url: '/applet/person/switchRole',
      method: 'POST',
      data,
      hideLoading,
    }).then((res) => {
      const { roleType } = data
      wx.setStorageSync(STORAGE.CURRENT_ROLE_TYPE, roleType)
      return res
    })
  },

  deleteUser(data, hideLoading = false) {
    return Request({
      url: '/applet/auth/deleteUser',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  // 我的模块-营业资质
  getQualifications(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getQualifications',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 我的模块-隐私保密
  getPrivacy(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getPrivacy',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 我的模块-学校验证
  getSchoolVerify(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getSchoolVerify',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 我的模块-资金安全
  getWalletSafe(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getWalletSafe',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 意见反馈-提交
  submitFeedback(data, hideLoading = false) {
    return Request({
      url: '/applet/person/submit',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  // 我的模块-其他-隐私设置-获取用户隐私信息
  getUserPrivacy(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getUserPrivacy',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 我的模块-其他-隐私设置-设置简历公开状态
  setResumeVisibility(data, hideLoading = false) {
    return Request({
      url: '/applet/person/setResumeVisibility',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  // 我的模块-其他-隐私设置-设置头像公开状态
  setAvatarVisibility(data, hideLoading = false) {
    return Request({
      url: '/applet/person/setAvatarVisibility',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  // 我的模块-其他-隐私设置-设置昵称是否公开
  setNameVisibility(data, hideLoading = false) {
    return Request({
      url: '/applet/person/setNameVisibility',
      method: 'POST',
      data,
      hideLoading,
    })
  },

  // 我的-招人模块-获取海报
  getPoster(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getPoster',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 右上角-查看用户个人信息
  getUserBaseInfo(data, hideLoading = false) {
    return Request({
      url: '/applet/person/getUserBaseInfo',
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 编辑用户个人信息
  updateBaseInfo(data, hideLoading = false) {
    return Request({
      url: '/applet/person/updateBaseInfo',
      method: 'POST',
      data,
      hideLoading,
    })
  },
}
