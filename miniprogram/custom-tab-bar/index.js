Component({
  data: {
    selected: 0,
    color: "rgba(0, 0, 0, 0.45)",
    selectedColor: "#07C160",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/assets/images/tabbar/job.svg",
        selectedIconPath: "/assets/images/tabbar/job-active.svg",
        text: "职位",
      },
      {
        pagePath: "/pages/notice/notice",
        iconPath: "/assets/images/tabbar/notice.svg",
        selectedIconPath: "/assets/images/tabbar/notice-active.svg",
        text: "公告",
      },
      {
        pagePath: "/pages/message/message",
        iconPath: "/assets/images/tabbar/message.svg",
        selectedIconPath: "/assets/images/tabbar/message-active.svg",
        text: "消息",
      },
      {
        pagePath: "/pages/mine/mine",
        iconPath: "/assets/images/tabbar/mine.svg",
        selectedIconPath: "/assets/images/tabbar/mine-active.svg",
        text: "我的",
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    },
  },
});
