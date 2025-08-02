import { Request } from "../utils/request";

export default {
  login(data, hideLoading = false) {
    return Request({
      url: "/applet/auth/login",
      method: "POST",
      data,
      hideLoading,
    });
  },

  loginRegistorByPhone(data) {
    return Request({
      url: "/applet/auth/authLogin",
      method: "POST",
      data,
    });
  },

  
  tryLogout(data) {
    return Request({
      url: "/mini/user/try_log_out/v1",
      method: "POST",
      data,
    });
  },
};
