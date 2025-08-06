// components/searchPanel/index.ts
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import { showToast } from "../../utils/helpers"

Component({
  behaviors: [messageBoxBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '搜索职位/单位名称'
    },
    isSearch: {
      type: Boolean,
      value: false
    },
    historyKey: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchValue: '',
    historyList: [],
  },

  lifetimes: {
    attached() {
      this.getHistory()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取存储的历史
    getHistory() {
      const {historyKey} = this.properties
      const data = wx.getStorageSync(historyKey) || []
      this.setData({ historyList: data })
      console.log('data', this.data.historyList);
    },

    handleClickSearch() {
      this.triggerEvent('hideSearchResult')
    },

    confirmSearch() {
      const {searchValue} = this.data
      if (!searchValue) return
      
      this.handleSearch(searchValue)
    },

    handleSearchHistory(e) {
      const {value} = e.currentTarget.dataset
      this.setData({
        searchValue: value
      })
      this.handleSearch(value)
    },

    handleSearch(searchValue) {
      this.saveHistory(searchValue)
      this.triggerEvent('handleSearch', {
        searchValue
      })
    },

    // 保存记录历史
    saveHistory(query) {
      const {historyList} = this.data
      const index = historyList.indexOf(query)
      if (index > -1) {
        historyList.splice(index, 1)
      }
      historyList.unshift(query)

      if (historyList.length > 20) {
        historyList.pop()
      }

      this.setData({
        historyList
      })

      wx.setStorageSync(this.properties.historyKey, historyList)
    },

    handleDeleteHistory() {
      this.$messageBox({
        title: '',
        message: `确定要删除历史搜索吗？`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirm: () => {
          showToast({
            title: '删除成功'
          })
          wx.removeStorageSync(this.properties.historyKey)
          this.getHistory()
        },
      })
    }
  }
})