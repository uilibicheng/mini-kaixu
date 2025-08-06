import { Request } from "../utils/request";

export default {
  // 获取公众号列表
  getOfficialAccountList(data, hideLoading = false) {
    return Request({
      url: "/applet/notice/getOfficialAccounts",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 通过公众号名称获取公众号信息
  getOfficialAccount(data) {
    return Request({
      url: "/applet/notice/getOfficialAccount",
      method: "POST",
      data,
    });
  },

  // 获取公众号文章列表
  getArticleList(data) {
    return Request({
      url: "/applet/notice/getArticles",
      method: "POST",
      data,
    });
  },
  
  // 是否已关注公众号
  isFollowAccount(data, hideLoading  = true) {
    return Request({
      url: "/applet/notice/isFollowAccount",
      method: "POST",
      data,
      hideLoading
    });
  },
};
