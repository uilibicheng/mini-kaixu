export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/* 日期格式化
 * date：时间戳或date类型
 * format：如yyyy-mm-dd hh:ii:ss。不区分大小写，位数任意
 */
export const dateFormat = (date, format) => {
  // 秒需要转成毫秒
  if (/^\d{10}$/.test(date)) {
    date = date * 1000
  }
  if (!(date instanceof Date)) {
    return dateFormat(new Date(date), format)
  }
  let result = format
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'i+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
  }
  // 匹配4位的年份
  if (/(y+)/i.test(result)) {
    result = result.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length),
    )
  }
  // 匹配2位或者1位的其他
  for (const key in o) {
    if (new RegExp(`(${key})`, 'i').test(result)) {
      result = result.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? String(o[key]) : `00${o[key]}`.substr(-2),
      )
    }
  }
  return result
}

const formatNumber = (n) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function isValidKey(
  key,
  object,
){
  return key in object
}

// 获取有效对象参数
export const getValidParams = (data = {}) => {
  let params = {}
  for (const k in data) {
    if (isValidKey(k, data)) {
      const v = data[k]
      if (
        v !== null &&
        v !== undefined &&
        v !== '' &&
        JSON.stringify(v) !== '{}' &&
        JSON.stringify(v) !== '[]'
      ) {
        params = Object.assign({}, params, { [k]: v })
      }
    }
  }
  return params
}

export const isSpecialChar = (str) => {
  const specialChar = ['=', '.', '@']
  for (const key in specialChar) {
    if (str.indexOf(specialChar[key]) != -1) {
      return true
    }
  }
  return false
}

// url 参数拼接
export const queryString = (data, isEncode = false) => {
  const str = []
  for (const k in data) {
    let v = data[k]
    if (v != null && v != undefined && v != '') {
      // 兼容参数有特殊字符
      if (isEncode && typeof v === 'string' && isSpecialChar(v)) {
        v = encodeURIComponent(v)
      }
      str.push(`${k}=${v}`)
    }
  }
  return str.length > 0 ? str.join('&') : ''
}

export function formatHttps(link) {
  return link ? link.replace('http:', 'https:') : link
}

export const getUrlParams = (url) => {
  const hashes = url.slice(url.indexOf('?') + 1).split('&')
  const params = {}
  hashes.map(hash => {
    const [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })
  return params
}

// 过滤重复的
export function removeDuplicates(arr, key) {
  const seen = new Set()
  return arr.filter(item => {
    const keyValue = item[key]
    if (seen.has(keyValue)) {
      return false
    } else {
      seen.add(keyValue)
      return true
    }
  })
}

export function emptyObject(obj) {
  for (const name in obj) {
    return false
  }
  return true
}

export function formatDecimal(num, length) {
  // 转换为数字类型（自动处理字符串数字）
  const number = Number(num);
  
  // 非数字返回空字符串
  if (isNaN(number)) return '';

  // 转换为字符串并分割整数和小数部分
  const str = number.toString();
  const [integerPart, decimalPart] = str.split('.');

  // 处理整数情况
  if (!decimalPart) {
    return `${integerPart}.00`;
  }

  // 处理小数情况（补充到两位）
  const paddedDecimal = decimalPart.padEnd(length, '0');
  return decimalPart.length === length
    ? str 
    : `${integerPart}.${paddedDecimal}`;
}
