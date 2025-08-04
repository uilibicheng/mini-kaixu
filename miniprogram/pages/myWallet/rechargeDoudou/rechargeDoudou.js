// pages/myWallet/rechargeDoudou/rechargeDoudou.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeList: [30, 50, 100, 200, 300, 400],
    selectIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  handleSelect(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      selectIndex: index
    })
  }
})