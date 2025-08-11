// pages/myResume/myResume.ts
import { ComponentWithComputed } from "miniprogram-computed";
import { getStorageUserBaseInfo, getUserBaseInfo } from "../../utils/helpers";

ComponentWithComputed({

  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '预览简历',
      method: 'handlePreview',
      isActive: true,
    },
    userBaseInfo: {},
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    async onShow() {
      await getUserBaseInfo()
      const userBaseInfo = getStorageUserBaseInfo()
      this.setData({
        userBaseInfo
      })
    },
  
    handlePreview() {
  
    },
  }
})