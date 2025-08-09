import { Request } from "../utils/request";

export default {
  getGoodsList(data, hideLoading = false) {
    return Request({
      url: "/applet/goods/getGoodsList",
      method: "GET",
      data,
      hideLoading,
    });
  },
};
