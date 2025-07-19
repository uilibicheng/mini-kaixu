export function reAuth() {
  //提前授权
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success(e) {
              // 用户已经同意小程序使用功能，后续调用接口不会弹窗询问
              resolve()
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '您未授权，导入功能将无法使用',
                showCancel: true,
                confirmText: '授权',
                confirmColor: '#52a2d8',
                success: function (res) {
                  if (res.confirm == true) {
                    wx.openSetting({
                      success: res => {
                        if (!res.authSetting['scope.address']) {
                          wx.showToast({
                            title: '未授权',
                            icon: 'none',
                          })
                        } else {
                          //成功
                          resolve()
                        }
                      },
                      fail: res => {
                        reject({ res })
                        wx.showToast({
                          title: '未授权',
                          icon: 'none',
                        })
                      },
                    })
                  } else {
                    reject({ res })

                    wx.showToast({
                      title: '未授权',
                      icon: 'none',
                    })
                  }
                },
              })
            },
          })
        } else {
          resolve()
        }
      },
      fail(err) {
        console.log(err)
        reject(err)
      },
    })
  })
}
