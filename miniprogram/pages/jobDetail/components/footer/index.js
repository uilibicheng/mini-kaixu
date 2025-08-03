// pages/jobDetail/components/footer/footer.ts
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import router from "../../../../utils/router"

Component({
  options: {
    addGlobalClass: true,
  },
  behaviors: [messageBoxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showConcatMessage: false,
    showFindJobPoster: false,
  },

  lifetimes: {
    attached() {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 发送简历相关开始
    showResumeMessagebox() {
      this.$messageBox({
        title: '',
        message: `<div style="font-size: 32rpx"><span>请先完善<span style="color: #07C160;">我的简历“必填”项</span></span><div>才能投递简历</div></div>`,
        showCancelButton: true,
        confirmButtonText: '去完善简历',
        cancelButtonText: '取消',
        confirm: async () => {
          router.navigateTo({
            url: '/pages/myResume/myResume'
          })
        },
      })
    },

    handleSendResume() {
      this.showResumeMessagebox()
    },
    // 发送简历相关结束

    // 拨打电话相关开始
    handleShowConcatMessage() {
      this.setData({
        showConcatMessage: true
      })
      this.$showMessageBox()
    },

    handleCloseConcatMessage() {
      this.setData({
        showConcatMessage: false
      })
      this.$closeMessageBox()
    },

    hanlePhoneCall(e) {
      const {phone} = e.currentTarget.dataset
      this.handleCloseConcatMessage()
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 拨打电话相关结束

    // 委托找工作分享开始
    handleToggleShowFindJobPoster() {
      this.setData({
        showFindJobPoster: !this.data.showFindJobPoster
      })
    }
  }
})