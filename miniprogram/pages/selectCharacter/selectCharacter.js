// pages/selectCharacter/selectCharacter.ts
const date = new Date()
const years = []
const months = []

for (let i = 1900; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    characterType: 2,
    years,
    months,
    year: date.getFullYear(),
    month: 1,
    value: [9999, 1],
    btnArr: [
      {
        name: '立即进入开旭教师招聘',
        method: 'goToIndex',
        isActive: true,
        width: '',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  selectType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      characterType: Number(type),
    })
  },

  goToIndex() {

  }
})