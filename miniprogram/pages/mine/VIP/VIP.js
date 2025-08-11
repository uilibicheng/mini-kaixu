import { ComponentWithComputed } from "miniprogram-computed";
import goodsApi from "../../../api/goods"
import { getStorageUserBaseInfo } from "../../../utils/helpers";

// pages/mine/VIP/VIP.ts
ComponentWithComputed({
  /**
   * 页面的初始数据
   */
  data: {
    userBaseInfo: {},
    goodsList: [],
    selectGoodsIndex: 0,
    isScroll: false,
    contentHeight: 0,
    isAgree: false,
  },

  computed: {
    currentGoods(data) {
      const {goodsList, selectGoodsIndex} = data
      return goodsList[selectGoodsIndex]
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
      await this.getGoodsList()
      const userBaseInfo = getStorageUserBaseInfo()
      this.setData({
        userBaseInfo
      })
      wx.nextTick(()=>{
        setTimeout(() => {
          this.getContentHeight()
        }, 100)
      })
    },
  
    async getGoodsList(){
      const list = await goodsApi.getGoodsList({
        type: 2
      })
      this.setData({
        goodsList: list && list.length ? list.map(item => {
          if (item.name.indexOf('年') > -1) {
            item.unit = '年'
          }
          if (item.name.indexOf('月') > -1) {
            item.unit = '月'
          }
          return item
        }) : []
      })
    },
  
    getContentHeight() {
      const query = wx.createSelectorQuery()
      query
        .select('.VIP-page')
        .boundingClientRect((res) => {
          console.log('res', res);
          this.setData({
            contentHeight: Math.ceil(res.height)
          })
        })
        .exec()
    },
  
    handleSelectGoods(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        selectGoodsIndex: index,
      })
    },

    toggleAgree() {
      this.setData({
        isAgree: !this.data.isAgree
      })
    },
  
    handleScroll(e) {
      if (!this.data.isScroll && e.detail.scrollTop > 50) {
        this.setData({
          isScroll: true,
        })
      }
      if (this.data.isScroll && e.detail.scrollTop <= 50) {
        this.setData({
          isScroll: false,
        })
      }
    },
  }
})
