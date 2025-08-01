// pages/jobIntention/jobIntention.ts
import { ComponentWithComputed } from "miniprogram-computed";
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import {showToast} from '@/utils/helpers'
import { JOB_INTENTION_KEY } from "../../config/constants";

const initCardInfo = {
  [JOB_INTENTION_KEY.XDXK]: '',
  [JOB_INTENTION_KEY.YXDQ]: '',
  [JOB_INTENTION_KEY.QWXZ]: '',
  [JOB_INTENTION_KEY.DWXZ]: '',
  [JOB_INTENTION_KEY.GWXZ]: '',
  [JOB_INTENTION_KEY.QZZT]: '',
}
// 岗位性质选项
const jobNatureOptionList = [
  {
    label: '编制',
    value: '',
  },
  {
    label: '非编',
    value: '',
  },
]
// 单位性质选项
const schoolNatureOptionList = [
  {
    label: '公办',
    value: '',
  },
  {
    label: '民办',
    value: '',
  },
]
// 期望薪资
const salarExpectionList = [
  [{label: '面议', value: ''},{label: '参考办公', value: ''},{label: '1k', value: ''},{label: '2k', value: ''}],
  [{label: '', value: ''}, {label: '2k', value: ''},{label: '3k', value: ''}],
]
// 求职状态
const jobStatusList = [
  [{label: '已离职-随时到岗', value: ''},{label: '在职-月内到岗', value: ''},{label: '在职-考虑机会', value: ''}],
]

ComponentWithComputed({
  behaviors: [messageBoxBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    btnArr: [
      {
        name: '保存',
        background: '#E2E2E2',
        color: '#fff',
        method: 'handleSave'
      },
    ],
    intentCardList: [JSON.parse(JSON.stringify(initCardInfo))],
    selectType: '',
  },

  computed: {
    showSubjectSheet(data) {
      return data.selectType === JOB_INTENTION_KEY.XDXK
    },
    showOptionCard(data) {
      const {selectType} = data
      return selectType === JOB_INTENTION_KEY.GWXZ || selectType === JOB_INTENTION_KEY.DWXZ
    },
    showOptionPicker(data) {
      const {selectType} = data
      return selectType === JOB_INTENTION_KEY.QWXZ || selectType === JOB_INTENTION_KEY.QZZT
    },
    optionList(data) {
      const {selectType} = data
      if (selectType === JOB_INTENTION_KEY.GWXZ) {
        return [...jobNatureOptionList]
      }
      if (selectType === JOB_INTENTION_KEY.DWXZ) {
        return [...schoolNatureOptionList]
      }
      if (selectType === JOB_INTENTION_KEY.QWXZ) {
        return [...salarExpectionList]
      }
      if (selectType === JOB_INTENTION_KEY.QZZT) {
        return [...jobStatusList]
      }
      return []
    },
    optionPickerTitle(data) {
      const {selectType} = data
      if (selectType === JOB_INTENTION_KEY.QWXZ) {
        return '选择期望薪资/年'
      }
      if (selectType === JOB_INTENTION_KEY.QZZT) {
        return '求职状态'
      }
      return ''
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
  
    },

    handleAddIntentionCard() {
      const {intentCardList} = this.data 
      intentCardList.push(JSON.parse(JSON.stringify(initCardInfo)))
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

    handleSelectFromActionSheet(e) {
      const {item, index} = e.detail
      console.log('item', item);
      this.setData({
        selectType: item.key,
      })
      if (item.key === JOB_INTENTION_KEY.YXDQ) {
        wx.navigateTo({
          url: '/pages/jobIntention/areaIntention',
        });
      }
    },

    handleCloseActionSheet() {
      this.setData({
        selectType: '',
      })
    },

    handleSave() {
      showToast({
        title: '请选择学科学段'
      })
    },

  }
})