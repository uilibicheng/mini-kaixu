import router from "../../../utils/router"

// pages/myWallet/myDoudou/myDoudou.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  jumpToRecharge() {
    router.navigateTo({
      url: '/pages/myWallet/rechargeDoudou/rechargeDoudou'
    })
  }
})