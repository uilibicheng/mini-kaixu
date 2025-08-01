// pages/mine/components/otherSetting/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({
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
    serviceData: {
        ZHSZ: {
        text: '账户设置',
        isRedDot: false,
        label: '',
      },
      YJFK: {
        text: '意见反馈',
        isRedDot: false,
        label: '',
      },
      YSSZ: {
        text: '隐私设置',
        isRedDot: false,
        label: '',
      },
    }
  },

  computed: {
    serviceList(data) {
      const {serviceData} = data
      return Object.keys(serviceData).map(key => {
        return {
          key,
          ...serviceData[key]
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})