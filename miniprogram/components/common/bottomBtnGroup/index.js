// components/common/bottomBtnGroup/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnArr: {
      type: Array,
      value: [],
    },
    // 整体高度, 默认124
    height: {
      type: String,
      value: "124rpx",
    },
    needSafeArea: {
      type: Boolean,
      value: true,
    },
    // 对齐方式
    justifyContent: {
      type: String,
      value: "center",
    },
    zIndex: {
      type: Number,
      value: undefined,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      const { method } = e.currentTarget.dataset;
      this.triggerEvent(method);
    },
  },
});
