// pages/jobIntention/areaIntention.ts
import { ComponentWithComputed } from 'miniprogram-computed'
import { PROVICNCE_CODE } from '../../config/constants'

ComponentWithComputed({
  /**
   * 页面的初始数据
   */
  data: {
    btnInfo: {
      name: '确定',
      isActive: false,
      method: 'handleConfirm',
    },
    areaVisible: false,
    areaInfo: {
      provinceCode: null,
      province: null,
      cityCode: null,
      city: null,
      areaCode: null,
      area: null,
    },
  },

  watch: {
    'areaInfo.**': function(info) {
      this.setData({
        ['btnInfo.isActive']: info.areaCode
      })
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      const eventChannel = this.getOpenerEventChannel()
      if (Object.keys(eventChannel).length) {
        eventChannel.on('sendAreaInfo', info => {
          if (!info.provinceCode) {
            info.provinceCode = PROVICNCE_CODE.ZJ
          }
          this.setData({
            areaInfo: info,
            areaVisible: true
          })
          console.log('areaInfo111', this.data.areaInfo);
        })
      } else {
        this.setData({
          areaVisible: true
        })
      }
    },
  
    handleSelect(e) {
      let { areaInfo } = this.data
      areaInfo = {
        ...areaInfo,
        ...e.detail,
      }
      this.setData({
        areaInfo,
      })
    },

    handleConfirm() {
      const {areaInfo} = this.data
      const eventChannel = this.getOpenerEventChannel()
      if (Object.keys(eventChannel).length) {
        eventChannel.emit('acceptAreaInfo', areaInfo)
      }
      wx.navigateBack({
        delta: 1,
      })
    }
  },
})
