import loginBehavior from "@/behaviors/loginBehavior";
import { unfinishFunctionToast } from "../../../../utils/helpers"
import router from "../../../../utils/router"

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
      this.jump('/pages/myWallet/myDoudou/myDoudou')
    },

    jumpToPickDoudou() {
      this.jump('/pages/myWallet/pickDoudou/pickDoudou')
    },

    jump(url) {
      this.actionWithCheckLogin({
        success: () => {
          router.navigateTo({
            url
          })
        }
      })
    }
  }
})