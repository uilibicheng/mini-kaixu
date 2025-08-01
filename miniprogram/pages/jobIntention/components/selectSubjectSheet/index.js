// pages/jobIntention/components/selectSubjectSheet/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnArr: [
      {
        name: '确定',
        method: 'handleSubmit',
        isActive: true,
        width: '',
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('close')
    },

    handleSubmit() {
      this.triggerEvent('submit')
    }
  }
})