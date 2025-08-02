import { showToast } from "../../utils/helpers";
import loginModalBehavior from "../../behaviors/loginModalBehavior";
import modalVisible from "../../behaviors/modalVisible";
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import router from "../../utils/router";

let isClickLogin = false

// components/loginModal/index.ts
Component({
  behaviors: [loginModalBehavior, modalVisible, messageBoxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    isTabbar: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAgree: false,
  },

  pageLifetimes: {
    show() {
      if (getApp().globalData.completeResumeMessageBox) {
        this.showMessagebox()
        getApp().globalData.completeResumeMessageBox = false
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToggleAgree() {
      this.setData({
        isAgree: !this.data.isAgree,
      })
    },

    onClickLogin() {
      const {isAgree} = this.data
      if (!isAgree) {
        showToast({
          title: '请勾选同意服务协议和隐私政策后再进行下一步操作',
        })
        return
      }

      if (isClickLogin) return
      isClickLogin = true

      this.doLogin().finally(() => {
        isClickLogin = false
      })
    },

    showMessagebox() {
      this.$messageBox({
        title: '温馨提示',
        message: `请先完善一份简历\n一份完整的简历是您成功求职的良好开始！`,
        showCancelButton: true,
        confirmButtonText: '完善简历',
        cancelButtonText: '先逛一逛',
        confirm: async () => {
          router.navigateTo({
            url: '/pages/myResume/myResume'
          })
        },
      })
    },
  },
});
