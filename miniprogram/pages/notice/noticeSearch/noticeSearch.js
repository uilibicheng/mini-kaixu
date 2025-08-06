// pages/notice/noticeSearch/index.ts
import { ComponentWithComputed } from "miniprogram-computed";
import noticeBehavior from "../../../behaviors/noticeBehavior";

ComponentWithComputed({
  behaviors: [noticeBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    accountId: '',
    searchValue: '',
    isSearch: false,
    articleList: [],
    end: false,
    pageInfo: {
      current: 1,
      size: 10,
    }
  },

  computed: {
    listParams(data) {
      const {accountId, searchValue} = data
      return {
        accountId,
        title: searchValue,
      }
    },
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        accountId: options.accountId
      })
    },
  
    hideSearchResult() {
      this.setData({
        isSearch: false
      })
    },
  
    handleSearch(e) {
      const {searchValue} = e.detail
      this.setData({
        isSearch: true,
        searchValue
      })
      this.getArticleList()
    },
  }
})