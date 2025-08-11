import loginApi from "../api/login"
import { STORAGE } from "../config/constants"
import { getUserBaseInfo, showToast } from "../utils/helpers"

export default Behavior({
  data: {
    loginCode: '',
    bindVisible: false,
  },

  methods: {
    doLogin() {
      const that = this
      return new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            if (res && res.code) {
              that.setData({
                loginCode: res.code,
              })
              return that.loginReq().finally(() => resolve({}))
            } else {
              showToast({
                title: res.errMsg,
              })
              return reject()
            }
          },
          fail: err => {
            showToast({
              title: err.errMsg,
            })
            return reject()
          },
        })
      })
    },

    loginReq() {
      const that = this
      return new Promise(resolve => {
        loginApi
          .login({
            code: that.data.loginCode,
          })
          .then(res => {
            if (res && res.token) {
              that.loginSuccess(res.token)
              this.jumpToSelectRole(res)
            } else {
              that.phoneBindModalMethod('toggleBindModal')
            }
          })
          .finally(() => {
            resolve({})
          })
      })
    },
    
    phoneBindModalMethod(method) {
      const ele = this.selectComponent('#phone-bind-modal')
      if (ele) {
        ele[method]()
      }
    },

    getphonedata(e) {
      const { encryptedData, iv, code } = e.detail
      this.loginRegistorByPhone({
        encryptedData,
        iv,
        code,
      })
    },

    loginRegistorByPhone(params) {
      loginApi.loginRegistorByPhone(params).then(
        res => {
          this.phoneBindModalMethod('onCloseMask')
          if (res && res.token) {
            this.loginSuccess(res.token)
            this.jumpToSelectRole(res)
          } else {
            showToast(res.msg)
          }
        },
        () => {
          this.phoneBindModalMethod('onCloseMask')
        },
      )
    },

    async loginSuccess(token) {
      wx.setStorageSync(STORAGE.USER_TOKEN, token)
      await getUserBaseInfo()
      this.onClose()
      // 判断是否有登陆后的回调方法
      this.triggerEvent('handleLoginSuccess')
    },

    jumpToSelectRole(res) {
      if (!res.roleType) {
        wx.navigateTo({
          url: '/pages/selectRole/selectRole',
        })
      } else {
        wx.setStorageSync(STORAGE.CURRENT_ROLE_TYPE, res.roleType)
      }
    }
  }
})