import router from "../../../../utils/router"

// pages/myResume/components/resumeItem/index.ts
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
    jumpToResumeAttachment() {
      router.navigateTo({
        url: '/pages/myResume/resumeAttachment/resumeAttachment'
      })
    },

    handlePreviewPdf() {
      // wx.openDocument({
      //   filePath: 'http://tmp/sX0z4P1S9XtB6ad8685b0be68f72db61572bdd5c95a8.pdf',
      //   fileType: 'pdf',
      //   success: () => console.log('预览成功'),
      //   fail: (err) => console.error('预览失败', err)
      // })

      // 或者使用web-view
    }
  }
})