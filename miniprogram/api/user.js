import { STORAGE } from "../config/constants";
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
    console.log('data', data);
    return Request({
      url: "/applet/person/switchRole",
      method: "POST",
      data,
      hideLoading,
    }).then(res => {
      const {roleType} = data
      wx.setStorageSync(STORAGE.CURRENT_ROLE_TYPE, roleType);
      return res
    })
  },

  deleteUser(data, hideLoading = false) {
    return Request({
      url: "/applet/auth/deleteUser",
      method: "POST",
      data,
      hideLoading,
    });
  },
};
