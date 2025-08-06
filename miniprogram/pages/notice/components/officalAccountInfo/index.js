import noticeApi from "../../../../api/notice"
import { isLogin } from "../../../../utils/helpers"

// pages/notice/components/officalAccountInfo/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    officalInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFollow: false,
    showImgPosterModal: false,
  },

  lifetimes: {
    attached() {
      this.isFollowAccount()
    }
  },

  pageLifetimes: {
    show() {
      this.isFollowAccount()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async isFollowAccount() {
      if (isLogin()) {
        const res = await noticeApi.isFollowAccount({
          accountId: this.properties.officalInfo.id
        })
        this.setData({
          isFollow: res.flagFollow
        })
        console.log('res', res);
      }
    },

    handleToggleShowImgPosterModal() {
      this.setData({
        showImgPosterModal: !this.data.showImgPosterModal
      })
    }
  }
})