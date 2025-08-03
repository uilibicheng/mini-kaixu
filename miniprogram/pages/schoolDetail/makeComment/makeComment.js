// pages/schoolDetail/makeComment/makeComment.ts
import { ComponentWithComputed } from 'miniprogram-computed'
import { showToast } from '../../../utils/helpers'

ComponentWithComputed({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: null,
    commentText: '',
  },

  computed: {
    isActive(data) {
      const {selectIndex, commentText} = data
      return !!(commentText && selectIndex !== null)
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
  
    },
  
    handleSelectSubject(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        selectIndex: index
      })
    },

    handleSubmit() {
      const {selectIndex, commentText} = this.data
      if (selectIndex === null) {
        showToast({
          title: '请选择话题'
        })
        return
      }
      if (!commentText) {
        showToast({
          title: '请输入你的点评'
        })
        return
      }
    }
  }
})