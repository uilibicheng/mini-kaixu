// app.ts
App({
  globalData: {
    completeResumeMessageBox: false, // 个人中心完善简历提示
  },

  async onLaunch() {
    this.globalData.needLogin = false;
  },

  async onShow() {},
});
