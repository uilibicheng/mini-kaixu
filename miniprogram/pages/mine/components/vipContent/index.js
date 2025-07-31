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
    vipData: {
      YJTD: {
        text: '一键投递',
        isRedDot: false,
        label: '所有学校',
      },
      JZLFX: {
        text: '竞争力分析',
        isRedDot: false,
        label: '不白投',
      },
      ZDJL: {
        text: '置顶简历',
        isRedDot: false,
        label: '',
      },
      TDCS: {
        text: '投递次数',
        isRedDot: false,
        label: '',
      },
      JLMB: {
        text: '简历模版',
        isRedDot: false,
        label: '优质',
      },
      JLZD: {
        text: '简历指导',
        isRedDot: false,
        label: '',
      },
      SFBS: {
        text: '身份标识',
        isRedDot: false,
        label: '',
      },
      NBTJ: {
        text: '内部推荐',
        isRedDot: false,
        label: '',
      },
    }
  },

  computed: {
    vipList(data) {
      const {vipData} = data
      return Object.keys(vipData).map(key => {
        return {
          key,
          ...vipData[key]
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