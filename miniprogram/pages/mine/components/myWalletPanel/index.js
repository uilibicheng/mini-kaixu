import loginBehavior from "@/behaviors/loginBehavior";
import { isLogin, unfinishFunctionToast } from "@/utils/helpers"
import walletApi from "@/api/wallet";

// pages/mine/components/myWallet/index.ts
Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [loginBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    balance: 0
  },

  pageLifetimes: {
    show() {
      this.getQueryBalance()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getQueryBalance() {
      if (isLogin()) {
        const res = await walletApi.getQueryBalance({}, true)
        this.setData({
          balance: res.balance
        })

      } else {
        this.setData({
          balance: 0
        })
      }
    },

    jumpToMySalary() {
      unfinishFunctionToast()
    },

    jumpToMyDoudou() {
      this.checkLoginJumpToUrl('/pages/myWallet/myDoudou/myDoudou')
    },

    jumpToPickDoudou() {
      this.checkLoginJumpToUrl('/pages/myWallet/pickDoudou/pickDoudou')
    },
  }
})