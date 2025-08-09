import walletApi from '../../../api/wallet'
import { isLogin } from '../../../utils/helpers'

// pages/myWallet/pickDoudou/pickDoudou.ts

const TITLE_MAP = {
  '上传简历附件': 'SCJLFJ',
  '邀请好友': 'YQHY',
  '开启招聘通知': 'KQZPTZ',
  '单位点评': 'DWDP',
  '绑定邮箱': 'BDYX',
  '上传头像': 'SCTX',
  '绑定手机': 'BDSJ',
  '完善个人信息': 'WSGRXX',
  '完善求职意向': 'WSQZYX',
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isScroll: false,
    balance: 0,
    awardInfo: {},
    growthTaskList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData()
  },

  async initData() {
    if (isLogin()) {
      this.getQueryBalance()
      this.getQueryAward()
      this.getQueryAwardTaskStatus()
    } else {
      this.setData({
        balance: 0,
        growthTaskList: [],
      })
    }
  },

  async getQueryBalance() {
    const res = await walletApi.getQueryBalance()
    this.setData({
      balance: res.balance,
    })
  },

  async getQueryAward() {
    const res = await walletApi.getQueryAward()
    this.setData({
      awardInfo: res
    })
  },

  async getQueryAwardTaskStatus() {
    const list = await walletApi.getQueryAwardTaskStatus()
    this.setData({
      growthTaskList: list && list.length ? list.map(item => {
        item.iconKey = TITLE_MAP[item.taskTitle]
        return item
      }) : [],
    })
  },

  handleScroll(e) {
    if (!this.data.isScroll && e.detail.scrollTop > 40) {
      this.setData({
        isScroll: true,
      })
    }
    if (this.data.isScroll && e.detail.scrollTop <= 40) {
      this.setData({
        isScroll: false,
      })
    }
  },
})
