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

  
  loginOut(data) {
    return Request({
      url: "/applet/auth/loginOut",
      method: "POST",
      data,
    });
  },
};
