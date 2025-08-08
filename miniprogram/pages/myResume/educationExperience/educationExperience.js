// pages/myResume/workExperience/workExperience.ts
import { ComponentWithComputed } from "miniprogram-computed";
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import {showToast} from '@/utils/helpers'
import { JOB_INTENTION_KEY } from "../../../config/constants";

const initCardInfo = {
  [JOB_INTENTION_KEY.XDXK]: '',
  [JOB_INTENTION_KEY.YXDQ]: '',
  [JOB_INTENTION_KEY.QWXZ]: '',
  [JOB_INTENTION_KEY.DWXZ]: '',
  [JOB_INTENTION_KEY.GWXZ]: '',
  [JOB_INTENTION_KEY.QZZT]: '',
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

ComponentWithComputed({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '保存',
      background: '#E2E2E2',
      color: '#fff',
      method: 'handleSave'
    },
    showSubjectSheet: false,
    intentCardList: [[]],
    // picker
    showOptionPicker: false,
    pickerOptionList: [],
    pickerValue: [],
    optionPickerTitle: '',
  },

  computed: {
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
  
    },

    handleAddIntentionCard() {
      const {intentCardList} = this.data 
      intentCardList.push([])
      this.setData({
        intentCardList
      })
    },

    deleteCardMessage(e) {
      const {index} = e.detail
      this.$messageBox({
        title: '',
        message: `确定删除求职意向${index + 1}？`,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelColor: 'rgba(0,0,0,0.3)',
        confirm: async () => {
          const {intentCardList} = this.data
          intentCardList.splice(index, 1)
          this.setData({
            intentCardList
          })
        },
      })
    },

    selectSubject(e) {
      const {cardIndex} = e.detail
      console.log('cardIndex', cardIndex);
      this.toggleShowSubjectSheet()
    },

    toggleShowSubjectSheet(e) {
      this.setData({
        showSubjectSheet: !this.data.showSubjectSheet
      })
    },

    selectTime(e) {
      const {cardIndex, title} = e.detail
      this.setData({
        optionPickerTitle: title,
        pickerOptionList: [years, months],
        pickerValue: [years.length - 1, 0],
      })
      this.toggleShowOptionPicker()
    },

    toggleShowOptionPicker() {
      this.setData({
        showOptionPicker: !this.data.showOptionPicker
      })
    },

    handleSave() {
      showToast({
        title: '请选择学科学段'
      })
    },

  }
})