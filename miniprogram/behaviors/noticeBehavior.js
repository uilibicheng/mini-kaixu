import noticeApi from "../api/notice"

export default Behavior({
  data: {
    articleList: [],
    end: false,
    pageInfo: {
      current: 1,
      size: 10,
    }
  },

  methods: {
    async getArticleList(hideLoading = false) {
      const {pageInfo, listParams} = this.data
      try {
        const params = {
          ...pageInfo,
          ...listParams,
        }
        
        let articleList = this.data.articleList
        if (pageInfo.current === 1) {
          articleList = []
        }

        const res = await noticeApi.getArticleList(params, hideLoading)
        const list = res.records && res.records.length ? res.records : []
        articleList = articleList.concat(list)
        this.setData({
          articleList,
          end: res.total <=  articleList.length
        })
      } catch (error) {
        this.setData({
          articleList: []
        })
      }
    },

    loadMore() {
      const {end, pageInfo} = this.data
      if (!end) {
        this.setData({
          ['pageInfo.current']: pageInfo.current + 1
        })
        this.getArticleList()
      }
    },
  }
})