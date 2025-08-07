import loginBehavior from "@/behaviors/loginBehavior";
import { unfinishFunctionToast } from "../../../../utils/helpers"

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
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