// components/jobFilterBar/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({
  /**
   * 组件的属性列表
   */
  properties: {
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    isTabbar: {
      type: Boolean,
      value: false,
    }
  },

  pageLifetimes: {
    hide() {
      this.handleCloseFilterPanel()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    filterVisible: false,
    filterType: 0, // 0 城市，1岗位，2筛选
    btnArr: [
      {
        name: '重置',
        method: 'handleReset',
        width: '220rpx',
      },
      {
        name: '确定',
        method: 'handleSubmit',
        isActive: true,
        width: '',
      },
    ]
  },

  computed: {
    panelTitle(data) {
      const {filterType} = data
      return {
        0: '工作区域',
        1: '选择学段学科',
        2: '筛选',
      }[filterType]
    },
    bottom(data) {
      const {isTabbar} = data
      if (isTabbar) {
        return `bottom: 100rpx;`
      }
      return ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShowFilterPanle(e) {
      const {type} = e.currentTarget.dataset
      this.setData({
        filterVisible: true,
        filterType: type
      })
    },

    handleCloseFilterPanel() {
      this.setData({
        filterVisible: false
      })
    },

    handleReset() {
      console.log('重置');
    },

    handleSubmit() {
      console.log('提交');
    }
  }
})