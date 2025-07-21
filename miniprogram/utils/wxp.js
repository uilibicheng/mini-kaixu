/**
 * 本方法将类似于 wx.request 等函数转化为 Promise 调用方式
 * 被转换的函数，该类型函数只接受一个 Object 类型参数，且必须具备 success 和 fail 回调。
 * 若参数里有success这种，就不会变成Promise
 */
export function promisify (options) {
  return function (options) {
    return new Promise((resolve, reject) => {
      const callbacks = {
        success: resolve,
        fail: reject,
      }
      options = options || ({})
      let __options = Object.assign({}, options, callbacks)
      fn(__options)
    })
  }
}

const wxp = {
  request: promisify(wx.request),
  login: promisify(wx.login),
  navigateTo: promisify(wx.navigateTo),
  redirectTo: promisify(wx.redirectTo),
  navigateBack: promisify(wx.navigateBack),
  getSystemInfo: promisify(wx.getSystemInfo),
  showModal: promisify(wx.showModal),
}

export default wxp
