
// app.ts
App<IAppOption>({
  globalData: {
  },

  async onLaunch() {
    this.globalData.needLogin = false
  },

  async onShow() {
  },
})
