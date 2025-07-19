export function isEmpty(value, title = null) {
  let result = false
  if (value == '' || value == null || typeof value == 'undefined') {
    if (title) {
      wx.showToast({
        title,
        icon: 'none',
      })
    }
    result = true
  }

  return result
}

export function tooLong(value, limit = 11, title) {
  let result = false
  if (value.length > limit) {
    wx.showToast({
      title,
    })
    result = true
  }
  return result
}

export function emptyObject(obj) {
  for (const name in obj) {
    return false
  }
  return true
}
