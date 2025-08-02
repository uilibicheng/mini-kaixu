import { isLogin } from "../utils/helpers"

export default Behavior({
  data: {
    loginVisible: false,
    isLogin: isLogin()
  },

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
    },
  }
})