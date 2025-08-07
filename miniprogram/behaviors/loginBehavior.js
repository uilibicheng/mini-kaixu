import { isLogin } from "../utils/helpers"

export default Behavior({
  data: {
    // loginVisible: false,
    // isLogin: isLogin()
  },

  methods: {
    actionWithCheckLogin: function (option) {
      const flag = isLogin()
      if (flag) {
        option?.success && option.success()
      } else {
        if (option?.fail) {
          option.fail()
        } else {
          if (typeof this.getAppBar === 'function' ) {
            const appBarComp = this.getAppBar()
            appBarComp.toggleLoginModal()
          }
        }
      }
    },

    // toggleLoginModal: function () {
    //   this.setData({
    //     loginVisible: !this.data.loginVisible,
    //   })
    // },

    // handleLoginSuccess: function () {
    // },
  }
})