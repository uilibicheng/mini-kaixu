// pages/jobDetail/components/jobBanner/index.ts
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList: {
      type: Array,
      value: ['/assets/images/jobDetail/job-banner.png']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPic: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSlideChange(e) {
      const { current } = e.detail
      this.setData({
        currentPic: current,
      })
    },
  }
})