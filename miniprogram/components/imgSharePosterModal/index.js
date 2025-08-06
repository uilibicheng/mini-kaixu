// pages/jobDetail/components/sharePoster/index.ts
import posterBehavior from '@/behaviors/posterBehavior'

Component({
  behaviors: [posterBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: ''
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    posterName: 'finJobPoster',
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})