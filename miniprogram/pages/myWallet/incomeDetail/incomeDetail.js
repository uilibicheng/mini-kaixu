// pages/myWallet/incomeDetail/incomeDetail.ts
import walletApi from "@/api/wallet";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logType: 0,
    logInfo: {},
    pageInfo: {
      current: 1,
      size: 20,
    },
    end: false,
    logList: [],
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData()
  },

  async initData() {
    this.getTotalWallet()
    this.getListWalletLog()
  },

  async getTotalWallet() {
    const res = await walletApi.getTotalWallet()
    this.setData({
      logInfo: res
    })
  },

  async getListWalletLog() {
    const {pageInfo, logType} = this.data
    try {
      const params = {
        ...pageInfo
      }
      params.logType = logType ? logType : ''
      let logList = [...this.data.logList]
      if (pageInfo.current === 1) {
        logList = []
      }
      const res = await walletApi.getListWalletLog(params)
      logList = logList.concat(res.records || [])
      this.setData({
        logList,
        end: res.total <=  logList.length
      })
    } catch (error) {
      this.setData({
        logList: [],
        end: true
      })
    }
  },

  handleChangeTab(e) {
    const {type} = e.currentTarget.dataset
    if (type === this.data.logType) return

    this.setData({
      logType: type,
      ['pageInfo.current']: 1,
      scrollTop: 0,
      end: false
    })
    this.getListWalletLog()
  },

  loadMore() {
    const {end, pageInfo} = this.data
    if (!end) {
      this.setData({
        ['pageInfo.current']: pageInfo.current + 1
      })
      this.getListWalletLog()
    }
  },
})