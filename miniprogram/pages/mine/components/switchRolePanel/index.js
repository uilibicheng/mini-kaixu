import router from "../../../../utils/router"

// pages/mine/components/switchRole/index.ts
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
    jumpToSwitchRole() {
      router.navigateTo({
        url: '/subpackages/mine/pages/switchRole/switchRole'
      })
    },

    jumpToEntrustInvite() {
      router.navigateTo({
        url: '/subpackages/mine/pages/entrustInvite/entrustInvite'
      })
    }
  }
})