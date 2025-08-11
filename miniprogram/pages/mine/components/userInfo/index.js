// pages/mine/components/userInfo/index.ts
import loginBehavior from "@/behaviors/loginBehavior";
import router from "../../../../utils/router";

Component({
  behaviors: [loginBehavior],
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
    handleClick(success) {
      this.actionWithCheckLogin({
        success: () => {
          success && success()
        }
      })
    },

    jumptToDeliveredResume() {
      this.handleClick(() => {
        router.navigateTo({
          url: '/pages/mine/deliveredResume/deliveredResume'
        })
      })
    },

    jumptToInterview() {
      this.handleClick(() => {
        router.navigateTo({
          url: '/pages/mine/interview/interview'
        })
      })
    },

    jumpToMyComment() {
      this.handleClick(() => {
        router.navigateTo({
          url: '/subpackages/mine/pages/myComment/myComment'
        })
      })
    },

    jumpToMyCollectJob() {
      this.handleClick(() => {
        router.navigateTo({
          url: '/pages/mine/myCollectJob/myCollectJob'
        })
      })
    }
  }
})