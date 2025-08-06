import { ComponentWithComputed } from "miniprogram-computed";
import noticeBehavior from "../../behaviors/noticeBehavior";
import noticeApi from "../../api/notice"
import router from "../../utils/router";

// pages/notice/notice.ts
ComponentWithComputed({
  behaviors: [noticeBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    tabIndex: 0,
    tabList: [],
  },

  computed: {
    currentOfficalInfo(data) {
      const {tabList, tabIndex} = data
      return tabList[tabIndex]
    },
    listParams(data) {
      const {currentOfficalInfo} = data
      return {
        accountId: currentOfficalInfo && currentOfficalInfo.id || ''
      }
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    async onShow() {
      await this.getOfficialAccountList(!this.data.isLoading)
      await this.getArticleList(!this.data.isLoading)
      this.setData({
        isLoading: false
      })
    },
    
    async getOfficialAccountList(hideLoading = false) {
      try {
        const list = await noticeApi.getOfficialAccountList({}, hideLoading)
        this.setData({
          tabList: list && list.length ? list : []
        })
      } catch (error) {
        this.setData({
          tabList: []
        })
      }
    },
  
    handleSelectTab(e) {
      const {index} = e.currentTarget.dataset
      if (index === this.data.tabIndex) return
  
      this.setData({
        tabIndex: index,
      })
    },

    jumpToSearch() {
      const {currentOfficalInfo} = this.data
      router.navigateTo({
        url: `/pages/notice/noticeSearch/noticeSearch?accountId=${currentOfficalInfo.id}`
      })
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
  
    }
  }
})