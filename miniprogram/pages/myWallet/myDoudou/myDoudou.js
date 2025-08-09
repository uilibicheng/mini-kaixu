import router from "../../../utils/router"
import walletApi from "@/api/wallet";
import { isLogin } from "../../../utils/helpers";

// pages/myWallet/myDoudou/myDoudou.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.getQueryBalance()
  },

  async getQueryBalance() {
    if (isLogin()) {
      const res = await walletApi.getQueryBalance()
      this.setData({
        balance: res.balance
      })

    } else {
      this.setData({
        balance: 0
      })
    }
  },

  jumpToRecharge() {
    router.navigateTo({
      url: '/pages/myWallet/rechargeDoudou/rechargeDoudou'
    })
  },

  jumpToPickDoudou() {
    router.navigateTo({
      url: '/pages/myWallet/pickDoudou/pickDoudou'
    })
  },

  jumpToIncomeDetail() {
    router.navigateTo({
      url: `/pages/myWallet/incomeDetail/incomeDetail`
    })
  }
})