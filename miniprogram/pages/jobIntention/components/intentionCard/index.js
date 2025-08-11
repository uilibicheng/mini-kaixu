import { JOB_INTENTION_KEY, JOB_INTENTION_LABEL } from "../../../../config/constants";

// pages/jobIntention/components/intentionCard/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardIndex: {
      type: Number,
      value: 0,
    },
    cardInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    intentionList: [
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.XDXK],
        value: '',
        key: JOB_INTENTION_KEY.XDXK,
      },
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.YXDQ],
        value: '',
        key: JOB_INTENTION_KEY.YXDQ,
      },
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.QWXZ],
        value: '',
        key: JOB_INTENTION_KEY.QWXZ,
      },
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.DWXZ],
        value: '',
        key: JOB_INTENTION_KEY.DWXZ,
      },
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.GWXZ],
        value: '',
        key: JOB_INTENTION_KEY.GWXZ,
      },
      {
        label: JOB_INTENTION_LABEL[JOB_INTENTION_KEY.QZZT],
        value: '',
        key: JOB_INTENTION_KEY.QZZT,
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelete() {
      this.triggerEvent('deleteCard', {index: this.properties.cardIndex})
    },

    handleSelect(e) {
      const {cardIndex} = this.data
      const {item, index} = e.currentTarget.dataset
      this.triggerEvent('selectVlue', {item, index, cardIndex})
    },
  }
})