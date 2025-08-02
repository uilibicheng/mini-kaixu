import { showToast } from "../../utils/helpers"

// components/common/phoneBindModal/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loginCode: {
      type: String,
      value: '',
    },
    btnBackground: {
      type: String,
      value: '',
    },
    bottom: {
      type: String,
      value: '',
    },
    needSafeBottom: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bindVisible: false,
    bindLoading: false,
    isGetPhoneNum: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleBindModal() {
      this.setData({
        bindVisible: true,
        bindLoading: false,
      })
    },

    onCloseMask() {
      this.setData({
        bindVisible: false,
        bindLoading: false,
      })
    },

    handleClickGetPhone() {
      if (this.data.isGetPhoneNum) return
      this.setData({
        bindLoading: true,
        isGetPhoneNum: true,
      })
    },

    bindPhoneNumber(e) {
      const detail = (e && e.detail) || {}
      // 安卓微信版本7.0手机号授权后会调用两次，第二次没有encryptedData故添加判断过滤掉后面的请求
      if (detail.errMsg == 'getPhoneNumber:ok' && detail.encryptedData) {
        wx.login({
          success: res => {
            if (res && res.code) {
              const params = {
                iv: detail.iv,
                encryptedData: detail.encryptedData,
                code: res.code,
              }
              this.triggerEvent('bindPhone', params)
            } else {
              showToast({
                title: res.errMsg,
              })
              this.setData({
                bindLoading: false,
              })
              return reject()
            }
          },
          fail: err => {
            showToast({
              title: err.errMsg,
            })
            this.setData({
              bindLoading: false,
            })
            return reject()
          },
        })
      } else {
        this.setData({
          bindLoading: false,
        })
      }
      this.setData({
        isGetPhoneNum: false,
      })
    },

    preventDefault: function () {},
  },
})
