// components/selectSubjectContent/index.ts
import { ComponentWithComputed } from 'miniprogram-computed'
import sysApi from '../../api/sys'
import { DICT_TYPE_MAP } from '../../config/constants'
import { showToast } from '../../utils/helpers'

ComponentWithComputed({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    isShowBtn: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoading: true,
    btnInfo: {
      name: '确定',
      method: 'handleSubmit',
      isActive: false,
      width: '',
    },
    schoolStageList: [],
    schoolIndex: null,
    subjectList: [],
    subjectIndex: null,
  },

  watch: {
    visible(bool) {
      if (bool && this.data.isLoading) {
        this.getSchoolStage()
      }
    },
    subjectIndex(index) {
      this.setData({
        ['btnInfo.isActive']: index !== null
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getDict(params) {
      const res = await sysApi.getDict(params)
      return res
    },

    async getSchoolStage() {
      const res = await this.getDict({
        dictType: `${DICT_TYPE_MAP.schoolStage},${DICT_TYPE_MAP.subject}`
      })
      console.log('res222', res);
      this.setData({
        schoolStageList: res,
        schoolIndex: 0,
        isLoading: false
      })
      this.getSubject()
    },

    async getSubject() {
      const {schoolIndex, schoolStageList} = this.data
      const schoolItem = schoolStageList[schoolIndex]
      let subjectList = schoolItem.childList
      let subjectIndex = null
      if (!(schoolItem.childList && schoolItem.childList.length)) {
        subjectList = [{
          ...schoolItem
        }]
        subjectIndex = 0
      }
      this.setData({
        subjectList,
        subjectIndex
      })
    },

    handleSelectSchool(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        schoolIndex: index
      })
      this.getSubject()
    },

    handleSelectSubject(e) {
      const {index} = e.currentTarget.dataset
      this.setData({
        subjectIndex: index
      })
    },

    handleSubmit() {
      const {btnInfo, schoolStageList, schoolIndex, subjectList, subjectIndex} = this.data
      console.log('btnInfo', btnInfo);
      if (!btnInfo.isActive) {
        showToast({
          title: '请先选择目标学段学科'
        })
        return
      }
      const schoolStage = schoolStageList[schoolIndex].name
      const subject = subjectList[subjectIndex].name
      console.log('schoolStage', schoolStage);
      this.triggerEvent('submit', {
        schoolStage,
        subject,
      })
    }
  }
})