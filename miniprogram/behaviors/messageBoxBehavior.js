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

export default Behavior({
  data: {},

  methods: {
    $messageBox(data) {
      const ele = this.selectComponent("#message-box");
      if (ele && ele.$messageBox) {
        ele.$messageBox(data);
      } else {
        // 全局组件兼容
        const messaegBoxInfo = {
          ...DEFAULT_MESSAGE_BOX_INFO(),
          ...data,
        };

        wx.showModal({
          title: messaegBoxInfo.title,
          content: messaegBoxInfo.message,
          showCancel: messaegBoxInfo.showCancelButton,
          cancelText: messaegBoxInfo.cancelButtonText,
          cancelColor: "#000000",
          confirmText: messaegBoxInfo.confirmButtonText,
          confirmColor: "#c6a47e",
          success: (result) => {
            if (result.confirm) {
              messaegBoxInfo.confirm && messaegBoxInfo.confirm();
            } else {
              messaegBoxInfo.cancel && messaegBoxInfo.cancel();
            }
          },
        });
      }
    },
  },
});
