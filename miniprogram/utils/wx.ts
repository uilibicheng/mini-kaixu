import { IRMiniShareParams } from '../config/interface/share'
import { showToast } from './helpers'
import { formatHttps } from './util'

const FILE_BASE_NAME = 'tmp_base64src'

export const savePicByAuthing = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              resolve({})
            },
            fail: err => {
              reject(err)
              wx.showModal({
                content: '只有「添加到相册」才可以保存图片',
                showCancel: true,
                confirmText: '去设置',
                confirmColor: '#DD2628',
                success: result => {
                  if (result.confirm) {
                    wx.openSetting()
                  } else {
                    showToast({
                      title: '海报保存失败，请到设置隐私中开启授权',
                    })
                  }
                },
              })
            },
          })
        } else {
          resolve({})
        }
      },
      fail(e) {
        reject(e)
      },
    })
  })
}

export const savePic = ({
  path,
  success,
  fail,
  complete,
}: {
  path: string
  success?: Function
  fail?: Function
  complete?: Function
}) => {
  wx.saveImageToPhotosAlbum({
    filePath: path,
    success: res => {
      if (success) {
        success && success(res)
      } else {
        showToast({
          title: '保存成功',
        })
      }
    },
    fail: res => {
      if (fail) {
        fail(res)
      } else {
        if (res.errMsg.indexOf('cancel') < 0) {
          showToast({
            title: '保存失败',
          })
        }
      }
    },
    complete: res => {
      complete && complete(res)
    },
  })
}

export const genMiniCodePic = ({
  params,
  success = () => {},
  fail = () => {},
}: {
  params: IRMiniShareParams
  success?: Function
  fail?: Function
}) => {
  // shareApi
  //   .genMiniShareCode(params)
  //   .then(data => {
  //     if (data.miniCodeImage) {
  //       base64src('data:image/jpeg;base64,' + data.miniCodeImage, (filePath: string) => {
  //         success && success(filePath)
  //       })
  //     } else {
  //       fail && fail()
  //     }
  //   })
  //   .catch(res => {
  //     fail && fail(res)
  //   })
}

const base64src = (base64data: string, cb: Function) => {
  const fsm = wx.getFileSystemManager()
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
  if (!format) {
    return new Error('ERROR_BASE64SRC_PARSE')
  }
  const timestamp = new Date().getTime().toString()
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}_${timestamp}.${format}`
  const buffer = wx.base64ToArrayBuffer(bodyData)
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath)
    },
    fail() {
      return new Error('ERROR_BASE64SRC_WRITE')
    },
  })
  return true
}

export const setTabbarLanguage = () => {
  const tabbarArr = [
    {
      index: 0,
      text: '首页',
      // iconPath: '/assets/images/icon/tabbar-homepage.png',
      // selectedIconPath: '/assets/images/icon/tabbar-homepage-active.png',
    },
    {
      index: 1,
      text: '购物袋',
      // iconPath: '/assets/images/icon/tabbar-cart.png',
      // selectedIconPath: '/assets/images/icon/tabbar-cart-active.png',
    },
    {
      index: 2,
      text: '我的',
      // iconPath: '/assets/images/icon/tabbar-mine.png',
      // selectedIconPath: '/assets/images/icon/tabbar-mine-active.png',
    },
  ]

  tabbarArr.forEach(item => {
    wx.setTabBarItem(item)
  })
}

export const refreshTabBar = async () => {
  // let cartNum = 0
  // if (isLogin()) {
  //   const res = await cartApi.getCartNum()
  //   cartNum = res.sizeNumTotal || 0
  // }
  // if (cartNum > 0) {
  //   cartNum = cartNum > 99 ? 99 : cartNum
  //   wx.setTabBarBadge({ index: 1, text: cartNum.toString() })
  // } else {
  //   wx.hideTabBarRedDot({
  //     index: 1,
  //   })
  // }

  // removeKaiYunBindInfo()
}

export async function getImageInfo(url: string) {
  return new Promise(resolve => {
    const src = formatHttps(url)
    wx.getImageInfo({
      src,
      success: res => {
        resolve(res)
      },
      fail: err => {
        resolve(err)
      },
    })
  })
}
