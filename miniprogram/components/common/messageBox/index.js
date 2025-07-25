const DEFAULT_MESSAGE_BOX_INFO = () => {
  return {
    title: "提示",
    message: "",
    messageAlign: "center",
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  };
};

Component({
  /**
   * 组件的初始数据
   */
  data: {
    showMessageBox: false,
    showModal: false,
    messaegBoxInfo: DEFAULT_MESSAGE_BOX_INFO(),
  },

  pageLifetimes: {
    hide() {
      this.closeMessageBox();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    $messageBox(data) {
      this.setData(
        {
          showMessageBox: true,
          messaegBoxInfo: {
            ...DEFAULT_MESSAGE_BOX_INFO(),
            ...data,
          },
        },
        () => {
          setTimeout(() => {
            this.setData({
              showModal: true,
            });
          }, 10);
        },
      );
    },

    closeMessageBox() {
      this.setData(
        {
          showModal: false,
        },
        () => {
          setTimeout(() => {
            this.setData({
              showMessageBox: false,
            });
          });
        },
      );
    },

    handleConfirmMessage() {
      const { messaegBoxInfo } = this.data;
      messaegBoxInfo.confirm && messaegBoxInfo.confirm();
      this.closeMessageBox();
    },

    handleCancelMessage() {
      const { messaegBoxInfo } = this.data;
      messaegBoxInfo.cancel && messaegBoxInfo.cancel();
      this.closeMessageBox();
    },
  },
});
