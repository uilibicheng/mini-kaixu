import { unfinishFunctionToast } from "../../../../utils/helpers"
import router from "../../../../utils/router"

// pages/mine/components/myWallet/index.ts
Component({
  options: {
    addGlobalClass: true
  },
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
      router.navigateTo({
        url: '/pages/myWallet/myDoudou/myDoudou'
      })
    }
  }
})