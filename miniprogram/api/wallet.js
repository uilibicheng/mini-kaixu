import { Request } from "../utils/request";

export default {
  // 我的-钱包-豆豆模块-豆豆余额
  getQueryBalance(data, hideLoading = false) {
    return Request({
      url: "/applet/wallet/queryBalance",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 我的-钱包-豆豆模块-收支明细头部汇总
  getTotalWallet(data, hideLoading = false) {
    return Request({
      url: "/applet/wallet/totalWallet",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 我的-钱包-豆豆模块-收支明细列表
  getListWalletLog(data, hideLoading = false) {
    return Request({
      url: "/applet/wallet/listWalletLog",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 我的-钱包-豆豆模块-成长捡豆
  getQueryAwardTaskStatus(data, hideLoading = false) {
    return Request({
      url: "/applet/wallet/queryAwardTaskStatus",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 我的-钱包-豆豆模块-今日获得豆豆
  getQueryAward(data, hideLoading = false) {
    return Request({
      url: "/applet/wallet/queryAward",
      method: "POST",
      data,
      hideLoading,
    });
  },

  // 豆豆模块-检查用户今日是否已签到
  checkInStatus(data, hideLoading = false) {
    return Request({
      url: "/applet/person/checkInStatus",
      method: "GET",
      data,
      hideLoading,
    });
  },

  // 豆豆模块-今日签到
  doCheckIn(data, hideLoading = false) {
    return Request({
      url: "/applet/person/doCheckIn",
      method: "POST",
      data,
      hideLoading,
    });
  },
};
