// pages/userBaseInfo/userBaseInfo.ts
import { ComponentWithComputed } from 'miniprogram-computed'
import { getStorageUserBaseInfo, getUserBaseInfo, goBack, showToast } from '../../utils/helpers'
import sysApi from '../../api/sys'
import userApi from '../../api/user'
import { DICT_TYPE_MAP } from '../../config/constants'

const SELECT_TYPE = {
  DQSF: 'identity',
  ZGXL: 'education',
  CSRQ: 'birthDate',
  CJGZ: 'workDate',
}
const PANEL_TITLE_MAP = {
  [SELECT_TYPE.DQSF]: '当前身份',
  [SELECT_TYPE.ZGXL]: '最高学历',
  [SELECT_TYPE.CSRQ]: '选择出生日期',
  [SELECT_TYPE.CJGZ]: '选择参加工作时间',
}

const date = new Date()
const years = []
const months = []

const initYear = 1900
for (let i = initYear; i <= date.getFullYear(); i++) {
  years.push({label: i + '年', value: i})
}

for (let i = 1; i <= 12; i++) {
  months.push({label: i + '月', value: i})
}
function getDatePickIndex(date) {
  const dateArr = date.split('-')
  const curYear = Number(dateArr[0])
  const curMonth = Number(dateArr[1])
  const yearIndex = years.findIndex(item => item.value === curYear)
  const monthIndex = months.findIndex(item => item.value === curMonth)
  return [yearIndex, monthIndex]
}

ComponentWithComputed({
  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '保存',
      method: 'handleSavePersonalInfo',
      isActive: true,
    },
    userBaseInfo: {
      avatar: null,
      username: null,
      sex: null,
      phone: null,
      email: null,
      identity: null,
      birthDate: null,
      workDate: null,
      education: null,
      provinceCode: null,
      cityCode: null,
      areaCode: null,
      province: null,
      city: null,
      area: null,
      address: null,
      wechatCode: null,
    },
    selectType: '',
    // 选择
    selectBtnInfo: {
      name: '确定',
      method: 'handleSelectSubmit',
      isActive: false,
    },
    selectVisible: false,
    // 最高学历
    educationOptionList: [],
    // 当前身份
    identityOptionList: [],
    selectIndex: null,
    // picker
    showOptionPicker: false,
    pickerOptionList: [],
    birthDatePickerValue: [],
    workDatePickerValue: [],
    // 选择地区
    selectAreaVisible: false,
  },

  computed: {
    panelTitle(data) {
      const {selectType} = data
      return PANEL_TITLE_MAP[selectType]
    },
    pickerValue(data) {
      const {birthDatePickerValue, workDatePickerValue, selectType} = data
      if (selectType === SELECT_TYPE.CSRQ) {
        return birthDatePickerValue
      }
      if (selectType === SELECT_TYPE.CJGZ) {
        return workDatePickerValue
      }
      return []
    },
    selectOptionList(data) {
      const {educationOptionList, identityOptionList, selectType} = data
      if (selectType === SELECT_TYPE.ZGXL) {
        return educationOptionList
      }
      if (selectType === SELECT_TYPE.DQSF) {
        return identityOptionList
      }
      return []
    },
    areaFullName(data) {
      const {province, city, area} = data.userBaseInfo
      let str = ''
      if (province) {
        str += province
      }
      if (city && city !== province) {
        str += city
      }
      if (area) {
        str += area
      }
      return str
    }
  },

  watch: {
    selectIndex(val) {
      this.setData({
        ['selectBtnInfo.isActive']: val !== null
      })
    },
    selectVisible(val) {
      if (!val) {
        this.setData({
          selectIndex: null,
          selectType: '',
        })
      }
    },
    showOptionPicker(val) {
      if (!val) {
        this.setData({
          pickerOptionList: [],
          selectType: '',
        })
      }
    },
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
      await getUserBaseInfo()
      const userBaseInfo = getStorageUserBaseInfo()
      this.setData({
        userBaseInfo: this.disposalUserInfo(userBaseInfo)
      })
      console.log('userBaseInfo', this.data.userBaseInfo);
    },

    disposalUserInfo(userInfo) {
      const info = {}
      Object.keys(this.data.userBaseInfo).forEach(key => {
        if (userInfo.hasOwnProperty(key)) {
          info[key] = userInfo[key]
        } else {
          info[key] = this.data.userBaseInfo[key]
        }
      })
      if (userInfo.name) {
        info.username = userInfo.name
      }
      if (info.birthDate) {
        this.setData({
          birthDatePickerValue: getDatePickIndex(info.birthDate)
        })
      }
      if (info.workDate) {
        this.setData({
          workDatePickerValue: getDatePickIndex(info.workDate)
        })
      }

      return info
    },

    getDatePickValue(date) {
      const dateArr = date.split('-')
      const yearIndex = years.findIndex(item => item.value === dateArr[0])
      const monthIndex = months.findIndex(item => item.value === dateArr[1])
      return [yearIndex, monthIndex]
    },
  
    // 上传头像
    handleSelectAvatar() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'front',
        success: res => {
          const tempFilePath = res.tempFiles[0].tempFilePath
          this.setData({
            ['userBaseInfo.avatar']: tempFilePath
          })
        }
      })
    },

    // 选择性别
    handleSelectSex(e) {
      const {sex} = e.currentTarget.dataset
      this.setData({
        ['userBaseInfo.sex']: sex
      })
    },

    async getDict(dictType) {
      const res = await sysApi.getDict({
        dictType
      })
      return res
    },

    // 当前身份 最高学历开始
    async handleSelectRadio(e) {
      const {type} = e.currentTarget.dataset
      let {userBaseInfo} = this.data
      const optionListKey = `${type}OptionList`
      if (!(this.data[optionListKey] && this.data[optionListKey].length)) {
        const list = await this.getDict(DICT_TYPE_MAP[type])
        this.setData({
          [optionListKey]: list
        })
      }
      let selectIndex = null
      if (userBaseInfo[type]) {
        selectIndex = this.data[optionListKey].findIndex(item => item.name === userBaseInfo[type])
      }
      this.setData({
        selectType: type,
        selectIndex
      })
      this.toggleShowSelectVisible()
    },
  
    toggleShowSelectVisible() {
      this.setData({
        selectVisible: !this.data.selectVisible,
      })
    },

    handleSelectOption(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        selectIndex: index
      })
    },

    handleSelectSubmit() {
      const {selectIndex, selectType} = this.data
      const dataKey = `userBaseInfo.${selectType}`
      const optionListKey = `${selectType}OptionList`
      this.setData({
        [dataKey]: this.data[optionListKey][selectIndex].name
      })
      this.toggleShowSelectVisible()
    },
    // 当前身份 最高学历结束

    // 出生日期、参加工作开始
    handleSelectPicker(e) {
      const {type} = e.currentTarget.dataset
      const {userBaseInfo} = this.data
      const pickerValueKey = `${type}PickerValue`
      const defaultValue = type === SELECT_TYPE.CJGZ ? [years.length - 1, 0] : [100, 0]
      this.setData({
        selectType: type,
        pickerOptionList: [years, months],
        [pickerValueKey]: userBaseInfo[type] ? this.data[pickerValueKey] : defaultValue,
      })
      this.toggleShowOptionPicker()
    },

    handleDateSubmit(e) {
      const {value} = e.detail
      const {selectType} = this.data
      const pickerValueKey = `${selectType}PickerValue` 
      const dataKey = `userBaseInfo.${selectType}`
      this.setData({
        [pickerValueKey]: value,
        [dataKey]: years[value[0]].value + '-' + months[value[1]].value,
      })
      this.toggleShowOptionPicker()
    },
    
    toggleShowOptionPicker() {
      this.setData({
        showOptionPicker: !this.data.showOptionPicker,
      })
    },
    // 出生日期、参加工作结束

    // 选择地区
    handleSelectArea() {
      this.toggleShowAreaVisible()
    },
    toggleShowAreaVisible() {
      this.setData({
        selectAreaVisible: !this.data.selectAreaVisible
      })
    },
    // 提交地区选择
    handleAreaSubmit(e) {
      const {provinceCode, cityCode, areaCode, province, city, area} = e.detail
      this.setData({
        ['userBaseInfo.provinceCode']: provinceCode,
        ['userBaseInfo.cityCode']: cityCode,
        ['userBaseInfo.areaCode']: areaCode,
        ['userBaseInfo.province']: province,
        ['userBaseInfo.city']: city,
        ['userBaseInfo.area']: area,
      })
      this.toggleShowAreaVisible()
    },

    isValidData() {
      const {userBaseInfo} = this.data
      const validTip = {
        avatar: '请上传头像',
        username: '请输入名字',
        sex: '请选择性别',
        phone: '请输入手机号',
        email: '请输入邮箱',
        identity: '请选择当前身份',
        birthDate: '请选择出生日期',
        workDate: '请选择工作日期',
        education: '请选择最高学历',
        provinceCode: '请选择居住地',
        cityCode: '请选择居住地',
        areaCode: '请选择居住地',
        address: '请输入详细地址',
        wechatCode: '请输入微信号',
      }
      const keys = Object.keys(userBaseInfo)
      let flag = true
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (userBaseInfo[key] === null || userBaseInfo[key] === '') {
          flag = false
          showToast({
            title: validTip[key]
          })
          break
        }
      }
      return flag
    },

    // 保存提交
    async handleSavePersonalInfo() {
      const {userBaseInfo} = this.data
      console.log('userBaseInfo', userBaseInfo);
      if (this.isValidData()) {
        const res = await userApi.updateBaseInfo(userBaseInfo)
        showToast({
          title: '保存成功',
          duration: 1000,
          callback: () => {
            goBack()
          }
        })
      }
    },
  }
})