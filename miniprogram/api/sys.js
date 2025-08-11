import { Request } from '../utils/request'

export default {
  // 获取地区列表
  getAreaList(data, hideLoading = false) {
    return Request({
      url: `/applet/sys/v1/getAreaList/${data.parentAreaCode}`,
      method: 'GET',
      data,
      hideLoading,
    })
  },

  // 查询字典类型的字典值
  getDict(data, hideLoading = false) {
    return Request({
      url: `/applet/sys/v1/getDict/${data.dictType}`,
      method: 'GET',
      data,
      hideLoading,
    })
  },
}
