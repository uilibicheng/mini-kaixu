// subpackages/mine/pages/myComment/myComment.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        label: '待接收',
        status: 1,
      },
      {
        label: '待面试',
        status: 2,
      },
      {
        label: '已拒绝',
        status: 3,
      },
      {
        label: '已过期',
        status: 4,
      },
    ],
    selectStatus: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  handleChangeTab(e) {
    const {item} = e.currentTarget.dataset
    this.setData({
      selectStatus: item.status
    })
  }
})