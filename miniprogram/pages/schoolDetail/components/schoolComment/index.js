import router from "../../../../utils/router"

// pages/schoolDetail/components/schoolComment/index.ts
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
    lockComment: true,
    commentList: [1,1,1,1,1,1,1,1,1]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    handleUnlock() {
      // this.setData({
      //   lockComment: false
      // })
      router.navigateTo({
        url: '/pages/schoolDetail/unlockAllComment'
      })
    },

    jumpToMakeComment() {
      router.navigateTo({
        url: '/pages/schoolDetail/makeComment/makeComment'
      })
    }
  }
})