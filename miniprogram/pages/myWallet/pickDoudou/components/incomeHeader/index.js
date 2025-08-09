import walletApi from "../../../../../api/wallet"

// pages/myWallet/pickDoudou/components/incomeHeader/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    balance: {
      type: String,
      value: '0'
    },
    awardInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasCheckedIn: 0,
  },

  lifetimes: {
    attached() {
      this.checkInStatus()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async checkInStatus() {
      const res = await walletApi.checkInStatus()
      console.log('res', res);
      this.setData({
        hasCheckedIn: res.hasCheckedIn || 0
      })
    },

    async handleChcekIn() {
      const {hasCheckedIn} = this.data
      if (hasCheckedIn) return

      const res = await walletApi.doCheckIn()
      console.log('res222', res);
      this.setData({
        hasCheckedIn: 1
      })
      this.triggerEvent('refresh')
    }
  }
})