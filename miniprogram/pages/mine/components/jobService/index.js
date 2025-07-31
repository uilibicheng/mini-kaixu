// pages/mine/components/vipContent/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({
  options: {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
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
        WDJL: {
        text: '我的简历',
        isRedDot: true,
        label: '',
      },
      QZYX: {
        text: '求职意向',
        isRedDot: true,
        label: '',
      },
      JLFJ: {
        text: '简历附件',
        isRedDot: true,
        label: '',
      },
      ZYGH: {
        text: '职业规划',
        isRedDot: false,
        label: '',
      },
      JLMB: {
        text: '简历模版',
        isRedDot: false,
        label: '',
      },
      GWTZ: {
        text: '岗位通知',
        isRedDot: false,
        label: '',
      },
      LXLS: {
        text: '联系老师',
        isRedDot: false,
        label: '答疑/进群',
      },
      KBFW: {
        text: '考编服务',
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