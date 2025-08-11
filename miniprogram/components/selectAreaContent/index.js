import { ComponentWithComputed } from 'miniprogram-computed'
import sysApi from '../../api/sys'
import { PROVICNCE_CODE } from '../../config/constants'
import { showToast } from '../../utils/helpers'

// components/job/selectAreaContent/index.ts
ComponentWithComputed({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowBtn: {
      type: Boolean,
      value: true,
    },
    visible: {
      type: Boolean,
      value: false,
    },
    provinceCode: {
      type: String,
      value: PROVICNCE_CODE.ZJ,
    },
    cityCode: {
      type: String,
      value: '',
    },
    areaCode: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    cancelBtnInfo: {
      name: '重置',
      method: 'handleAreaReset',
      width: '220rpx',
      color: 'rgba(0,0,0,0.7)',
      background: '#F2F2F6',
    },
    submitBtnInfo: {
      name: '确定',
      method: 'handleAreaSubmit',
      isActive: false,
      width: '',
    },
    isLoading: true,
    provinceList: [],
    provinceIndex: null,
    provinceViewId: '',
    cityList: [],
    cityIndex: null,
    cityViewId: '',
    areaList: [],
    areaIndex: null,
    areaViewId: '',
  },

  computed: {
    btnArray(data) {
      const { cancelBtnInfo, submitBtnInfo } = data
      return [{ ...cancelBtnInfo }, { ...submitBtnInfo }]
    },
  },

  watch: {
    visible(val) {
      if (val && this.data.isLoading) {
        this.getAreaList()
      }
    },
    areaIndex(val) {
      this.setData({
        ['submitBtnInfo.isActive']: val !== null,
      })
    },
  },

  lifetimes: {
    // attached() {
    //   this.getAreaList(PROVICNCE_CODE.DEFAULT)
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getAreaList(parentAreaCode = PROVICNCE_CODE.DEFAULT) {
      const list = await sysApi.getAreaList({
        parentAreaCode,
      })
      this.setData({
        provinceList: list || [],
        isLoading: false,
      })
      this.initArea()
    },

    async initArea() {
      const { provinceCode, cityCode, areaCode } = this.properties
      if (provinceCode) {
        const provinceIndex = this.data.provinceList.findIndex(
          (item) => item.areaCode === provinceCode
        )
        console.log('provinceIndex', provinceIndex)
        if (provinceIndex > -1) {
          await this.handleSelectProvince(provinceIndex)
        }
      }
      if (cityCode) {
        const cityIndex = this.data.cityList.findIndex(
          (item) => item.areaCode === cityCode
        )
        console.log('cityIndex', cityIndex)
        if (cityIndex > -1) {
          await this.handleSelectCity(cityIndex)
        }
      }
      if (areaCode) {
        const areaIndex = this.data.areaList.findIndex(
          (item) => item.areaCode === areaCode
        )
        console.log('areaIndex', areaIndex)
        if (areaIndex > -1) {
          this.handleSelectArea(areaIndex)
        }
      }
    },

    async handleSelectProvince(e) {
      return new Promise(resolve => {
        const index = !isNaN(e) ? e : e.currentTarget.dataset.index
        const { provinceList, provinceIndex } = this.data
        if (provinceIndex === index) return
  
        const proviceItem = provinceList[index]
        let nextChild = proviceItem.child
        const cityHasChild = nextChild[0].hasChild
        const cityList = cityHasChild ? nextChild : [{...proviceItem}]
        let areaList = cityHasChild ? [] : proviceItem.child
        let areaIndex = null
        this.setData({
          provinceIndex: index,
          provinceViewId: `province-${index > 0 ? index - 1 : index}`,
          cityList,
          areaList,
          areaIndex,
          cityIndex: null
        })
        this.triggerEvent('handleSelect', {
          provinceCode: proviceItem.areaCode,
          province: proviceItem.areaFullName,
        })
        // 如果没有下一层的child，说明是直辖市，返回跳过当前选择
        if (!cityHasChild) {
          this.handleSelectCity(0)
        }

        resolve()
      })
    },

    async handleSelectCity(e) {
      return new Promise(resolve => {
        const index = !isNaN(e) ? e : e.currentTarget.dataset.index
        const { cityList, cityIndex } = this.data
        if (cityIndex === index) return
  
        this.setData({
          areaList: cityList[index].child,
          cityIndex: index,
          areaIndex: null,
          cityViewId: `city-${index > 0 ? index - 1 : index}`,
        })
  
        this.triggerEvent('handleSelect', {
          cityCode: cityList[index].areaCode,
          city: cityList[index].areaFullName,
        })
        
        resolve()
      })
    },

    handleSelectArea(e) {
      return new Promise(resolve => {
        const index = !isNaN(e) ? e : e.currentTarget.dataset.index
        const { areaIndex, areaList } = this.data
        if (areaIndex === index) return
  
        this.setData({
          areaIndex: index,
          areaViewId: `area-${index > 0 ? index - 1 : index}`,
        })
  
        this.triggerEvent('handleSelect', {
          areaCode: areaList[index].areaCode,
          area: areaList[index].areaFullName,
        })

        resolve()
      })
    },

    handleAreaReset() {
      this.setData({
        provinceIndex: '',
        provinceViewId: 'province-0',
        cityList: [],
        cityIndex: null,
        cityViewId: '',
        areaList: [],
        areaIndex: null,
        areaViewId: '',
      })
    },

    handleAreaSubmit() {
      const {
        submitBtnInfo,
        provinceList,
        cityList,
        areaList,
        provinceIndex,
        cityIndex,
        areaIndex,
      } = this.data
      if (!submitBtnInfo.isActive) return
      const province = provinceList[provinceIndex]
      const city = cityList[cityIndex]
      const area = areaList[areaIndex]

      const provinceCode = province.areaCode
      const cityCode = city.areaCode
      const areaCode = area.areaCode
      
      this.triggerEvent('handleSubmit', {
        provinceCode,
        cityCode,
        areaCode,
        province: province.areaFullName,
        city: city.areaFullName,
        area: area.areaFullName,
      })
    },
  },
})
