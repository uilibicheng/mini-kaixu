Component({
  data: {
    selected: 0,
    color: "rgba(0, 0, 0, 0.45)",
    selectedColor: "#07C160",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/assets/images/tabbar/job-active.png",
        selectedIconPath: "/assets/images/tabbar/job-active.png",
        text: "职位",
      },
      {
        pagePath: "/pages/notice/notice",
        iconPath: "/assets/images/tabbar/notice.png",
        selectedIconPath: "/assets/images/tabbar/notice.png",
        text: "公告",
      },
      {
        pagePath: "/pages/message/message",
        iconPath: "/assets/images/tabbar/message.png",
        selectedIconPath: "/assets/images/tabbar/message.png",
        text: "消息",
      },
      {
        pagePath: "/pages/mine/mine",
        iconPath: "/assets/images/tabbar/mine.png",
        selectedIconPath: "/assets/images/tabbar/mine.png",
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
