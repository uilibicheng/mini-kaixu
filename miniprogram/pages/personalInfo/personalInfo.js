// pages/personalInfo/personalInfo.ts
import { ComponentWithComputed } from 'miniprogram-computed'

const SELECT_TYPE = {
  DQSF: 'dqsf',
  ZGXL: 'zgxl',
  CSRQ: 'csrq',
  CJGZ: 'cjgz',
}
const PANEL_TITLE_MAP = {
  [SELECT_TYPE.DQSF]: '当前身份',
  [SELECT_TYPE.ZGXL]: '最高学历',
  [SELECT_TYPE.CSRQ]: '选择出生日期',
  [SELECT_TYPE.CJGZ]: '选择参加工作时间',
}
const DQSFOptionList = [
  {
    label: '在校学生',
    value: '1',
  },
  {
    label: '应届生',
    value: '2',
  },
  {
    label: '往届生',
    value: '3',
  },
  {
    label: '在职非编',
    value: '4',
  },
  {
    label: '在职在编',
    value: '5',
  },
]
const ZGXLOptionList = [
  {
    label: '初中及以下',
    value: '1',
  },
  {
    label: '中专/中技',
    value: '2',
  },
  {
    label: '高中',
    value: '3',
  },
  {
    label: '大专',
    value: '4',
  },
  {
    label: '本科',
    value: '5',
  },
  {
    label: '硕士',
    value: '6',
  },
  {
    label: '博士',
    value: '7',
  },
]

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
    selectType: '',
    // 选择
    selectBtnInfo: {
      name: '确定',
      method: 'handleSelectSubmit',
      isActive: false,
    },
    selectVisible: false,
    selectOptionList: [],
    selectIndex: null,
    // picker
    showOptionPicker: false,
    pickerOptionList: [],
    pickerValue: [],
    // 选择地区
    selectAreaVisible: false,
    selectAreaBtnArr: [
      {
        name: '重置',
        method: 'handleAreaReset',
        width: '220rpx',
        color: 'rgba(0,0,0,0.7)',
        background: '#F2F2F6',
      },
      {
        name: '确定',
        method: 'handleAreaSubmit',
        isActive: true,
        width: '',
      },
    ]
  },

  computed: {
    panelTitle(data) {
      const {selectType} = data
      return PANEL_TITLE_MAP[selectType]
    },
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
          selectOptionList: []
        })
      }
    },
    showOptionPicker(val) {
      if (!val) {
        this.setData({
          pickerOptionList: [],
          pickerValue: []
        })
      }
    },
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
  
    },
  
    handleSelectAvatar() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'front',
        success: res => {
          console.log('res', res);
          console.log(res.tempFiles[0].tempFilePath)
        }
      })
    },

    // 当前身份
    handleSelectIdentity() {
      this.setData({
        selectType: SELECT_TYPE.DQSF,
        selectOptionList: DQSFOptionList
      })
      this.toggleShowSelectVisible()
    },

    // 最高学历
    handleSelectEducation() {
      this.setData({
        selectType: SELECT_TYPE.ZGXL,
        selectOptionList: ZGXLOptionList
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
  
    },

    // 出生日期
    handleSelectBirth() {
      this.setData({
        selectType: SELECT_TYPE.CSRQ,
        pickerOptionList: [years, months],
        pickerValue: [years.length - 1, 0],
      })
      this.toggleShowOptionPicker()
    },

    // 参加工作
    handleSelectJobTime() {
      console.log(3333, this.data.showOptionPicker);
      this.setData({
        selectType: SELECT_TYPE.CJGZ,
        pickerOptionList: [years, months],
        pickerValue: [years.length - 1, 0],
      })
      this.toggleShowOptionPicker()
    },
    
    toggleShowOptionPicker() {
      this.setData({
        showOptionPicker: !this.data.showOptionPicker,
      })
    },

    // 选择地区
    handleSelectArea() {
      this.toggleShowAreaVisible()
    },
    toggleShowAreaVisible() {
      this.setData({
        selectAreaVisible: !this.data.selectAreaVisible
      })
    },

    handleAreaReset() {

    },

    handleAreaSubmit() {

    },

    // 保存提交
    handleSavePersonalInfo() {

    },
  }
})