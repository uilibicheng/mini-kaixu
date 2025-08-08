// pages/myResume/selfEvaluation/selfEvaluation.ts
import { ComponentWithComputed } from 'miniprogram-computed'

ComponentWithComputed({

  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '保存',
      method: 'handleSavePersonalInfo',
      isActive: true,
    },
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
  
    },
  }
})