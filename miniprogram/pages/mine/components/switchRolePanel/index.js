import loginBehavior from "@/behaviors/loginBehavior";

// pages/mine/components/switchRole/index.ts
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
    jumpToSwitchRole() {
      this.checkLoginJumpToUrl('/subpackages/mine/pages/switchRole/switchRole')
    },

    jumpToEntrustInvite() {
      this.checkLoginJumpToUrl('/subpackages/mine/pages/entrustInvite/entrustInvite')
    },
  }
})