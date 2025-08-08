// components/common/optionPicker/index.ts
import { ComponentWithComputed } from 'miniprogram-computed'

ComponentWithComputed({
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
      value: ''
    },
    pickerList: {
      type: Array,
      value: []
    },
    pickerValue: {
      tyep: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
  },

  watch: {
    visible(val) {
      if (val) {
        this.setData({
          value: this.properties.pickerValue
        })
      } else [
        this.setData({
          value: []
        })
      ]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('close')
    },

    bindChange() {

    }
  }
})