// pages/mine/VIP/components/VIPEquityDetail/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({

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
      },
      JZLFX: {
        text: '竞争力分析',
      },
      ZDJL: {
        text: '置顶简历',
      },
      TDCS: {
        text: '投递次数',
      },
      JLMB: {
        text: '简历模版',
      },
      JLZD: {
        text: '简历指导',
      },
      SFBS: {
        text: '身份标识',
      },
      NBTJ: {
        text: '内部推荐',
      },
    },
    detailViewId: '',
    descViewId: '',
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
    handleSelect(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        detailViewId: `detail-${index > 0 ? index - 1 : index}`,
        descViewId: `desc-${index}`,
      })
      console.log(333, this.data.detailViewId, this.data.descViewId);
    }
  }
})