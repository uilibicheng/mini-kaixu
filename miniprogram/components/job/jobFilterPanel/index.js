// components/jobFilterPanel/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '筛选'
    },
    bottom: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnArr: [
      {
        name: '重置',
        method: 'handleReset',
        width: '220rpx',
      },
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
    handleCloseModal() {
      this.triggerEvent("close", {}, {});
    },

    handleReset() {
      this.triggerEvent('handleReset')
    },

    handleSubmit() {
      this.triggerEvent('handleSubmit')
    }
  }
})