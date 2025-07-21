// components/languageSheet/languageSheet.ts
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
      value: '',
    },
    list: {
      type: Array,
      value: [],
    },
    name: {
      type: String,
      value: 'name',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedIndex: 0,
  },

  lifetimes: {
    attached() {
      // const language = wx.getStorageSync(STORAGE.LANGUAGE)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('close')
    },

    handleConfirm() {
      const { selectedIndex } = this.data

      this.triggerEvent('confirm', { selectedIndex })
      this.handleClose()
    },

    columnChange(e: any) {
      const selectedIndex = e.detail.value[0]
      this.setData({ selectedIndex })
    },
  },
})
