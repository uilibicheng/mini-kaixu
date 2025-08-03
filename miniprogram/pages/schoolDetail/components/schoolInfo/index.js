// pages/schoolDetail/components/schoolInfo/index.ts
Component({
  options: {
    addGlobalClass: true,
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
    jumpToHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    handleSwitchTab() {
      this.triggerEvent('switchTab', {index: 2})
    }
  }
})