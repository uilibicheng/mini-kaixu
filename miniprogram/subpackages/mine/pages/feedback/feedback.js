import userApi from "../../../../api/user";
import { goBack, showToast } from "../../../../utils/helpers";

// subpackages/mine/pages/feedback/feedback.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    optionsList: ['电话空号', '无人接听', '工资虚假', '非法收费', '职介冒充']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  async handleSubmit(e) {
    const {feedbackInfo} = e.detail
    const res = await userApi.submitFeedback(feedbackInfo)
    showToast({
      title: '意见反馈提交成功',
      duration: 1500,
      callback: () => {
        goBack()
      }
    })
  }
})