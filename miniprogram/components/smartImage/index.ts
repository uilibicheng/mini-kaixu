// components/smartImage/index.js
import { ComponentWithComputed } from 'miniprogram-computed'

ComponentWithComputed({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: '',
    },
    defaultImage: {
      type: String,
      value: '',
    },
    lazyLoad: {
      type: Boolean,
      value: true,
    },
    mode: {
      type: String,
      value: 'aspectFill', // aspectFit|aspectFill|widthFix
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageErr: false,
    completeLoad: false,
  },

  watch: {
    src() {
      this.setData({
        imageErr: false,
        completeLoad: false,
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    errorHandler() {
      this.setData({
        imageErr: true,
      })
      this.triggerEvent('error', {}, {})
    },

    loadHandler() {
      this.setData({
        completeLoad: true,
      })
    },
  },
})
