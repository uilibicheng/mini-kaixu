// pages/mine/components/otherSetting/index.ts
import { ComponentWithComputed } from "miniprogram-computed";
import router from "../../../../utils/router";
import { actionWithCheckLogin, isLogin } from "../../../../utils/helpers";

ComponentWithComputed({
  options: {
    addGlobalClass: true
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
        ZHSZ: {
        text: '账户设置',
        isRedDot: false,
        label: '',
        url: '/subpackages/mine/pages/accountSetting/accountSetting'
      },
      YJFK: {
        text: '意见反馈',
        isRedDot: false,
        label: '',
        url: '/subpackages/mine/pages/feedback/feedback',
        checkLogin: true,
      },
      YSSZ: {
        text: '隐私设置',
        isRedDot: false,
        label: '',
        url: '/subpackages/mine/pages/privacySetting/privacySetting',
        checkLogin: true,
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
    handleClick(e) {
      const {item} = e.currentTarget.dataset
      console.log('item', item);
      if (item.checkLogin && !isLogin()) {
        this.triggerEvent('toggleLoginModal')
        return
      }
      if (item.url) {
        router.navigateTo({
          url: item.url
        })
      }
    }
  }
})