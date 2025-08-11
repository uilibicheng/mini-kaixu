import { ComponentWithComputed } from "miniprogram-computed";
import router from "../../../../utils/router"

// pages/myResume/components/resumeItem/index.ts
ComponentWithComputed({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    userBaseInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    userDesc(data) {
      const {userBaseInfo} = data
      const arr = []
      if (userBaseInfo.hasOwnProperty('sex')) {
        arr.push(userBaseInfo.sex === 0 ? '女' : '男')
      }
      if (userBaseInfo.hasOwnProperty('education')) {
        arr.push(userBaseInfo.education)
      }
      return arr.join('｜')
    }
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