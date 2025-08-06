// pages/jobSearch/jobSearch.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  hideSearchResult() {
    this.setData({
      isSearch: false
    })
  },

  handleSearch(e) {
    const {searchValue} = e.detail
    console.log('searchValue', searchValue);
    this.setData({
      isSearch: true
    })
  }
})