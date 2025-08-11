import router from "@/utils/router"

// pages/index/components/jobList/index.ts
Component({
  options: {
    multipleSlots: true,
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToJobDetail() {
      router.navigateTo({
        url: '/pages/jobDetail/jobDetail'
      })
    }
  }
})