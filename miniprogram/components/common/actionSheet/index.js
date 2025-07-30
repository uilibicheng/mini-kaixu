// components/common/actionSheet/index.ts
import { ComponentWithComputed } from "miniprogram-computed";

ComponentWithComputed({
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: "服务说明",
    },
    isShowHeader: {
      type: Boolean,
      value: true,
    },
    canCancel: {
      type: Boolean,
      value: true,
    },
    height: {
      type: String,
      value: "",
    },
    bottom: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    display: false,
  },

  watch: {
    visible(val) {
      if (val) {
        this.setData(
          {
            display: true,
          },
          () => {
            this.setData({
              show: true,
            });
          },
        );
      } else {
        this.setData({
          show: false,
        });
        let timer = setTimeout(() => {
          this.setData({
            display: false,
          });
          clearTimeout(timer);
        }, 200);
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent("close", {}, {});
    },

    clickMask() {
      if (this.data.canCancel) {
        this.close();
      }
    },
    closeExternal() {
      this.close();
    },
  },
});
