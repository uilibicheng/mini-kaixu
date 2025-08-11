// pages/jobIntention/jobIntention.ts
import { ComponentWithComputed } from "miniprogram-computed";
import messageBoxBehavior from "@/behaviors/messageBoxBehavior"
import {showToast} from '@/utils/helpers'
import { DICT_TYPE_MAP, JOB_INTENTION_KEY, JOB_NATURE_OPTION, SCHOOL_NATURE_OPTION } from "../../config/constants";
import sysApi from '../../api/sys'

const initCardInfo = {
  [JOB_INTENTION_KEY.XDXK]: {
    schoolStage: null,
    subject: null,
    selectValue: '',
  },
  [JOB_INTENTION_KEY.YXDQ]: {
    provinceCode: null,
    province: null,
    cityCode: null,
    city: null,
    areaCode: null,
    area: null,
    selectValue: '',
  },
  [JOB_INTENTION_KEY.QWXZ]: {
    salaryRange: null,
    selectValue: '',
  },
  [JOB_INTENTION_KEY.DWXZ]: {
    unitNature: null,
    selectValue: '',
  },
  [JOB_INTENTION_KEY.GWXZ]: {
    jobNature: null,
    selectValue: '',
  },
  [JOB_INTENTION_KEY.QZZT]: {
    workStatus: null,
    selectValue: '',
  },
}
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
    cardIndex: 0,
    jobStatusOptionist: [],
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
      const {selectType, jobStatusOptionist} = data
      if (selectType === JOB_INTENTION_KEY.GWXZ) {
        return [...JOB_NATURE_OPTION]
      }
      if (selectType === JOB_INTENTION_KEY.DWXZ) {
        return [...SCHOOL_NATURE_OPTION]
      }
      if (selectType === JOB_INTENTION_KEY.QWXZ) {
        return [...jobStatusOptionist]
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
      this.getJogStatusOptionList()
    },

    async getJogStatusOptionList() {
      const res = await this.getDict({
        dictType: DICT_TYPE_MAP.jobStatus
      }, true)
      console.log('res121212',  res);
    },

    async getDict(params) {
      const res = await sysApi.getDict(params)
      return res
    },

    // 添加选项卡
    handleAddIntentionCard() {
      const {intentCardList} = this.data 
      intentCardList.push(JSON.parse(JSON.stringify(initCardInfo)))
      this.setData({
        intentCardList
      })
    },

    // 删除选项卡
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

    // 对应选项卡点击选择
    handleSelectFromActionSheet(e) {
      const {item, cardIndex, index} = e.detail
      console.log('item', item);
      this.setData({
        selectType: item.key,
        cardIndex,
      })
      if (item.key === JOB_INTENTION_KEY.YXDQ) {
        this.jumpToAreaIntention()
      }
    },

    // 跳转到地区选择
    jumpToAreaIntention() {
      const that = this
      wx.navigateTo({
        url: '/pages/jobIntention/areaIntention',
        events: {
          acceptAreaInfo(info) {
            console.log('acceptAreaInfo11111', info);
            const {cardIndex, selectType, intentCardList} = that.data
            console.log('intentCardList', intentCardList, cardIndex, selectType);
            info.selectValue = info.province + (info.city !== info.province ? info.city : '') + info.area
            intentCardList[cardIndex][selectType] = info
            that.setData({
              intentCardList,
            })
            console.log('info', info);
            console.log('intentCardList', intentCardList)
          }
        },
        success: res => {
          const {cardIndex, selectType, intentCardList} = that.data
          const areaInfo = intentCardList[cardIndex][selectType]
          res.eventChannel.emit('sendAreaInfo', areaInfo)
        },
      })
    },

    handleCloseActionSheet() {
      this.setData({
        selectType: '',
      })
    },
    
    // 提交学段学科
    handleSubmitSubject(e) {
      console.log('e', e);
      const {schoolStage, subject} = e.detail
      const {selectType, cardIndex, intentCardList} = this.data
      const info = {
        schoolStage,
        subject,
        selectValue: schoolStage + subject,
      }
      intentCardList[cardIndex][selectType] = info
      this.setData({
        intentCardList,
      })
      console.log('intentCardList', intentCardList)
      this.handleCloseActionSheet()
    },

    // 单位性质和岗位性质选择
    handleSelectNature(e) {
      const {index} = e.detail
      const {optionList, selectType, intentCardList, cardIndex} = this.data
      let info = {
        selectValue: optionList[index].label,
      }
      if (selectType === JOB_INTENTION_KEY.DWXZ) {
        info.unitNature = optionList[index].value
      }
      if (selectType === JOB_INTENTION_KEY.GWXZ) {
        info.jobNature = optionList[index].value
      }
      intentCardList[cardIndex][selectType] = info
      this.setData({
        intentCardList,
      })
      this.handleCloseActionSheet()
    },

    handleSave() {
      showToast({
        title: '请选择学科学段'
      })
    },

  }
})