import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import { dateFormat } from "../../../utils/util";
import { showToast } from "../../../utils/helpers";
import router from "../../../utils/router";

// pages/myResume/resumeAttachment/resumeAttachment.ts
function formatFileSize(bytes) {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes >= MB) {
    // 处理MB单位（保留两位小数，自动四舍五入）
    return (bytes / MB).toFixed(1) + 'MB';
  } else {
    // 处理KB单位（保留两位小数，自动补零）
    return Math.floor((bytes / KB)) + 'KB';
  }
}

Page({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    pdfInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  handleUploadResume() {
    wx.chooseMessageFile({
      count: 1, // 最多选择1个文件
      type: 'file', // 限制文件类型为普通文件
      success: res => {
        const pdfInfo = res.tempFiles[0]
        console.log('pdfInfo', pdfInfo);
        const tempFilePath = pdfInfo.path // 临时文件路径
        const fileName = pdfInfo.name // 文件名（含扩展名）

        // 检查文件类型和大小（示例限制10MB）
        if (!fileName.endsWith('.pdf')) {
          wx.showToast({ title: '请上传PDF文件', icon: 'none' })
          return
        }
        if (pdfInfo.size > 20 * 1024 * 1024) {
          wx.showToast({ title: '文件大小不能超过20MB', icon: 'none' })
          return
        }
        pdfInfo.fileName = pdfInfo.name.replace(/\.([^.]+)$/, '$1')
        pdfInfo.sizeName = formatFileSize(pdfInfo.size)
        pdfInfo.time = dateFormat(new Date(), 'yyyy年mm月dd日')
        console.log('pdfInfo', pdfInfo)
        this.setData({
          pdfInfo
        })
        // http://tmp/sX0z4P1S9XtB6ad8685b0be68f72db61572bdd5c95a8.pdf

        this.uploadFile(tempFilePath, fileName)
      },
    })
  },

  uploadFile() {

  },

  handleDelete() {
    this.$messageBox({
      title: '',
      message: `确定删除简历附件？`,
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      confirm: async () => {
        showToast({
          title: '删除成功'
        })
        this.setData({
          pdfInfo: null
        })
      },
    })
  },

  handlePreview() {
    wx.openDocument({
      filePath: this.data.pdfInfo.path,
      fileType: 'pdf',
      success: () => console.log('预览成功'),
      fail: (err) => console.error('预览失败', err)
    })

    // router.navigateTo({
    //   url: `/pages/webView/webView?url=${encodeURIComponent(this.data.pdfInfo.path)}`
    // })
  }
})
