// components/paymenPanel/index.ts
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import router from "../../utils/router"

Component({
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
    paymentType: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSwitchType(e) {
      const {type} = e.currentTarget.dataset
      if (type === this.data.paymentType) return
      
      if (type === 2) {
        this.showRechageMessageBox()
        return
      }

      this.setData({
        paymentType: type
      })
    },

    jumpToRecharge() {
      router.navigateTo({
        url: '/pages/rechargeDoudou/rechargeDoudou'
      })
    },


    showRechageMessageBox() {
      this.$messageBox({
        title: '',
        message: `豆豆余额不足`,
        showCancelButton: true,
        confirmButtonText: '立即充值',
        cancelButtonText: '取消',
        confirm: () => {
          this.jumpToRecharge()
        },
      })
    }
  }
})