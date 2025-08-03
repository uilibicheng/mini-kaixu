// components/common/errorOrEmpty/index.ts
import { ComponentWithComputed } from 'miniprogram-computed'

function typeMapInit() {
  return {
    search: {
      text: '抱歉，没找到相关商品',
    },
  }
}

ComponentWithComputed({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '',
    },
    image: {
      type: String,
      value: '',
    },
    emptyType: {
      type: String,
      value: '',
    },
    btnText: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeMap: typeMapInit(),
  },

  lifetimes: {
    attached() {
      this.setData({
        typeMap: typeMapInit(),
      })
    },
  },

  computed: {
    emptyText(data) {
      const text = data.text || (data.emptyType && data.typeMap[data.emptyType].text) || '暂无数据'
      return text
    },
    emptyImage(data) {
      return (
        data.image || (data.emptyType && data.typeMap[data.emptyType].image) || '/assets/images/icon/icon-empty.svg'
      )
    },
    showBtnText(data) {
      const text = data.btnText || (data.emptyType && data.typeMap[data.emptyType].btnText) || '随便看看'
      return text
    },
    showNavToHome(data) {
      const arr = ['order', 'cart']
      return arr.includes(data.emptyType)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refresh() {
      this.triggerEvent('refresh')
    },
    navToHome() {
      wx.reLaunch({ url: '/pages/index/index' })
    },
  },
})
