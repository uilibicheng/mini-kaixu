// subpackages/mine/components/certificateImge/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
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
    previewImage() {
      const {src} = this.properties
      wx.previewImage({
        current: src,
        urls: [src],
      });
    }
  }
})