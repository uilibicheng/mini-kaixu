import router from "../../../../utils/router"

// pages/jobDetail/components/schoolInfo/index.ts
Component({
  options: {
    addGlobalClass: true,
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
    jumpToSchoolDetail() {
      router.navigateTo({
        url: '/pages/schoolDetail/schoolDetail'
      })
    }
  }
})