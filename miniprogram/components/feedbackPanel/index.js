// components/feedbackPanel/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({

  /**
   * 组件的属性列表
   */
  properties: {
    optionsList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnInfo: {
      name: '提交',
      method: 'handleSubmit',
      isActive: false,
    },
    feedbackInfo: {
      contactName: '',
      contactPhone: '',
      content: '',
      title: ''
    }
  },

  watch: {
    'feedbackInfo.**': function(info) {
      this.validData({...info})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    validData(info) {
      console.log('info', info);
      let isActive = true
      const arr = Object.keys(info)
      for (let i = 0; i < arr.length; i++) {
        const item = info[arr[i]];
        if (item === '') {
          isActive = false
          break
        }
      }
      this.setData({
        ['btnInfo.isActive']: isActive
      })
    },

    handleSelectTitle(e) {
      const {item} = e.currentTarget.dataset
      this.setData({
        ['feedbackInfo.title']: item
      })
    },

    handleSubmit() {
      const {btnInfo, feedbackInfo} = this.data
      if (!btnInfo.isActive) return

      this.triggerEvent('handleSubmit', {feedbackInfo})
    },
  }
})