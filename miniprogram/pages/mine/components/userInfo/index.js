// pages/mine/components/userInfo/index.ts
import { actionWithCheckLogin } from "../../../../utils/helpers"

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isLogin: {
      type: Boolean,
      value: false,
    }
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
    handleClick() {
      actionWithCheckLogin({
        success: () => {
        },
        fail: () => {
          this.triggerEvent('toggleLoginModal')
        }
      })
    }
  }
})