// pages/myResume/trialLectureVideo/trialLectureVideo.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '保存',
      background: '#E2E2E2',
      color: '#fff',
      method: 'handleSave',
    },
    videoList: [],
    uploadProgress: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  handleUpload() {
    wx.chooseMedia({
      sourceType: ['camera'],
      sizeType: ['compressed'], // 压缩视频
      success: (res) => {
        // if (res.duration > 30) {
        //   wx.showToast({ title: '视频超时', icon: 'none' })
        //   return
        // }
        // this.uploadVideo(res.tempFilePath)
      },
    })
  },

  uploadVideo(filePath) {
    const uploadTask = wx.uploadFile({
      url: 'https://api.yourserver.com/upload', // 替换为实际接口
      filePath: filePath,
      name: 'video',
      formData: {
        userId: '123456' // 自定义参数
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        if (data.code === 200) {
          this.setData({ videoUrl: data.url })
        }
      },
      fail: (err) => {
        wx.showToast({ title: '上传失败', icon: 'none' })
      }
    })

    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress,
        uploading: true
      })
      if (res.progress === 100) {
        wx.hideLoading()
      }
    })
  }
})
