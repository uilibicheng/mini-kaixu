export default Behavior({
  data: {
    // 返回顶部
    isBackToTop: false,
    scrollTopNum: 0,
  },

  methods: {
    // 获取滚动条当前位置
    onScroll(e: any) {
      const { scrollTop } = e.detail
      if (scrollTop > 200 && !this.data.isBackToTop) {
        this.setData({ isBackToTop: true })
      }

      if (scrollTop <= 150 && this.data.isBackToTop) {
        this.setData({ isBackToTop: false })
      }
    },

    // 返回顶部
    onBackToTop() {
      this.setData({ scrollTopNum: 0 })
    },
  },
})
