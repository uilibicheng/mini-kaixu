import loginApi from '../api/login'
import {
  actionWithCheckLogin,
  getKaiYunBindInfo,
  getUserBaseInfo,
  goBack,
  isDifferentCompany,
  showToast,
} from '../utils/helpers'
import { STORAGE } from '../config/constants'
import router from '@/utils/router'

export default Behavior({
  data: {
    loginCode: '',
    bindVisible: false,
  },

  methods: {
    getUserProfile() {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: () => {
          this.doLogin()
        },
      })
    },

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
            jsCode: that.data.loginCode,
          })
          .then(res => {
            if (res && res.userToken) {
              that.loginSuccess(res.userToken)
            } else {
              that.phoneBindModalMethod('toggleBindModal')
            }
          })
          .finally(() => {
            resolve({})
          })
      })
    },

    phoneBindModalMethod(method: string) {
      const ele = this.selectComponent('#phone-bind-modal')
      if (ele) {
        ele[method]()
      }
    },

    getphonedata(e: any) {
      const { encryptedData, iv } = e.detail
      this.loginRegistorByPhone({
        encryptedData,
        iv,
        jsCode: this.data.loginCode,
      })
    },

    loginRegistorByPhone(params: any) {
      loginApi.loginRegistorByPhone(params).then(
        res => {
          this.phoneBindModalMethod('onCloseMask')
          if (res && res.userToken) {
            this.loginSuccess(res.userToken)
          } else {
            showToast(res.msg)
          }
        },
        () => {
          this.phoneBindModalMethod('onCloseMask')
        },
      )
    },

    async loginSuccess(userToken: string) {
      wx.setStorageSync(STORAGE.USER_TOKEN, userToken)
      // 登录成功后，清除水印图片，重新生成
      getApp().globalData.alreadyLoadBaseInfo = false
      getApp().globalData.waterMaskImg = ''
      await getUserBaseInfo(this.data.loginCode)

      // 判断是否有登陆后的回调方法
      if (this.loginCallback) {
        // @ts-ignore
        this.loginCallback()
      } else {
        // 只有获取到绑定方式才需要去进行绑定
        const kaiyunBindInfo = getKaiYunBindInfo()
        const isBind = !!(kaiyunBindInfo && Object.keys(kaiyunBindInfo).length)
        actionWithCheckLogin({
          isBind,
          success: () => {
            goBack()
          },
          fail: () => {
            if (isDifferentCompany()) {
              goBack()
            } else {
              // 去绑定
              router.redirectTo({
                url: `/pages/user/mailBoxBinding?url=${encodeURIComponent(this.data.redirectUrl)}`,
              })
            }
          },
        })
      }
    },
  },
})
