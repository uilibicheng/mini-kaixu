import router from "../../../../utils/router"

const URLS = {
  1: '/subpackages/mine/pages/fundSecurity/fundSecurity',
  2: '/subpackages/mine/pages/schoolCertification/schoolCertification',
  3: '/subpackages/mine/pages/privacySecrecy/privacySecrecy',
  4: '/subpackages/mine/pages/businessLicense/businessLicense',
}
Component({

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
    jumpToPage(e) {
      const {type} = e.currentTarget.dataset
      router.navigateTo({
        url: URLS[type]
      })
    },
  }
})