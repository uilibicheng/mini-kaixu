// pages/jobDetail/components/floatRight/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showShareModal: false,
    showPoster: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToggleShowShareModal() {
      this.setData({
        showShareModal: !this.data.showShareModal
      })
    },

    handleToggleShowPoster() {
      this.setData({
        showPoster: !this.data.showPoster
      })
    },

    closeSharePoster() {

    }
  }
})