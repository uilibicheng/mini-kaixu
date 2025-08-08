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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelete() {
      this.triggerEvent('deleteCard', {index: this.properties.cardIndex})
    },

    selectSubject() {
      this.triggerEvent('selectSubject', {cardIndex: this.data.cardIndex})
    },

    handleSelectTime(e) {
      const {title} = e.currentTarget.dataset
      this.triggerEvent('selectTime', {cardIndex: this.data.cardIndex, title})
    },
  }
})