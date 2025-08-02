import { Request } from "../utils/request";

export default {
  saveUserInfo(data, hideLoading = false) {
    return Request({
      url: "/applet/auth/saveUserInfo",
      method: "POST",
      data,
      hideLoading,
    });
  },

  switchRole(data, hideLoading = false) {
    return Request({
      url: "/applet/person/switchRole",
      method: "POST",
      data,
      hideLoading,
    });
  },
};
