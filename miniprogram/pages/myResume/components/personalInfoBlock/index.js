import router from "../../../../utils/router"

// pages/myResume/components/resumeItem/index.ts
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
    jumpToPersonalInfo() {
      router.navigateTo({
        url: '/pages/personalInfo/personalInfo'
      })
    }
  }
})