import goodsApi from "../../../api/goods"

// pages/myWallet/rechargeDoudou/rechargeDoudou.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    selectIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getGoodsList()
  },

  async getGoodsList(){
    const list = await goodsApi.getGoodsList({
      type: 1
    })
    this.setData({
      goodsList: list
    })
  },

  handleSelect(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      selectIndex: index
    })
  }
})