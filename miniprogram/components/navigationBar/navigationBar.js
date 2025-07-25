import { goBack } from "@/utils/helpers";

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "",
    },
    background: {
      type: String,
      value: "",
    },
    color: {
      type: String,
      value: "",
    },
    showNavigationLeft: {
      type: Boolean,
      value: true,
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: "_showChange",
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: "",
    textPaddingLeft: "",
    ios: false,
    innerPaddingRight: "",
    leftWidth: "",
    safeAreaTop: "",
  },
  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect();
      const windowInfo = wx.getWindowInfo();
      const deviceInfo = wx.getDeviceInfo();
      const isAndroid = deviceInfo.platform === "android";
      const isOhos = deviceInfo.platform === "ohos";
      const isDevtools = deviceInfo.platform === "devtools";
      const capsuleWidth = windowInfo.windowWidth - rect.left;
      this.setData({
        ios: !isAndroid,
        innerPaddingRight: `padding-right: ${capsuleWidth}px;`,
        textPaddingLeft: `padding-left: calc(${capsuleWidth}px - 88rpx);`, // 右边胶囊宽度-左边返回按钮宽度
        safeAreaTop:
          isDevtools || isAndroid || isOhos
            ? `height: calc(var(--height) + ${windowInfo.statusBarHeight}px); padding-top: ${windowInfo.statusBarHeight}px`
            : ``,
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show) {
      const animated = this.data.animated;
      let displayStyle = "";
      if (animated) {
        displayStyle = `opacity: ${show ? "1" : "0"};transition:opacity 0.5s;`;
      } else {
        displayStyle = `display: ${show ? "" : "none"};`;
      }
      this.setData({
        displayStyle,
      });
    },
    back() {
      const data = this.data;
      if (data.delta) {
        goBack(data.delta);
      }
      this.triggerEvent("back", { delta: data.delta }, {});
    },
  },
});
