// app-bar/index.ts
import loginBehavior from "../behaviors/loginBehavior"
import { isLogin, refreshCurrentPage } from "../utils/helpers"

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isTabbar: false,
    loginVisible: false,
    isLogin: isLogin()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    actionWithCheckLogin: function ({ success }) {
      if (isLogin()) {
        success && success()
      } else {
        this.toggleLoginModal()
      }
    },

    toggleLoginModal: function () {
      this.setData({
        loginVisible: !this.data.loginVisible,
      })
    },

    handleLoginSuccess: function () {
      refreshCurrentPage()
    },
  }
})