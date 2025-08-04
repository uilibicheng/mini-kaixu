import { savePic, savePicByAuthing } from '@/utils/wx'
import { showToast } from '@/utils/helpers'

export default Behavior({
  data: {
    snapshotId: '#target',
    posterName: 'temp_' + new Date().getTime(),
  },

  methods: {
    handleSavePoster() {
      const {snapshotId, posterName} = this.data
      wx.showLoading({
        title: '保存中...',
        mask: true,
      })
      this.createSelectorQuery()
        .select(snapshotId)
        .node()
        .exec(res => {
          const node = res[0].node
          node.takeSnapshot({
            type: 'arraybuffer',
            format: 'png',
            success: (res) => {
              const f = `${wx.env.USER_DATA_PATH}/${posterName}.png`
              const fs = wx.getFileSystemManager()
              fs.writeFileSync(f, res.data, 'binary')
              // 获取授权，保存图片
              savePicByAuthing()
                .then(() => {
                  savePic({
                    path: f,
                    success: () => {
                      wx.hideLoading()
                      showToast({
                        title: '海报保存成功',
                      })
                    },
                    fail: () => {
                      wx.hideLoading()
                      showToast({
                        title: '海报保存失败',
                      })
                    },
                  })
                })
                .catch(() => {
                  wx.hideLoading()
                })
            },
            fail: (err) => {
              wx.hideLoading()
              showToast({
                title: '非常抱歉，保存海报功能暂不可用',
              })
            },
          })
        })
    },

    close() {
      this.triggerEvent('close')
    },

    prevent() {},
  }
})