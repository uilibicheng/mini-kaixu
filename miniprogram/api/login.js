import { Request } from "../utils/request";

export default {
  /**
   * 唯代购小程序-静默登录接口，静默登陆是是指：通过openId和unionid，
   * 去底层查询是否有被账号绑定过，如果有绑定，直接登录，否则走手机号登陆注册流程
   * https://wiki.corp.vipshop.com/pages/viewpage.action?pageId=1013190543
   */
  login(data, hideLoading = false) {
    return Request({
      url: "/mini/user/try_login/v1",
      method: "POST",
      data,
      hideLoading,
    });
  },

  /**
   * 唯代购小程序-手机号登陆注册接口（仅用于通过微信授权的手机号登陆注册）
   * https://wiki.corp.vipshop.com/pages/viewpage.action?pageId=1323966417
   */
  loginRegistorByPhone(data) {
    return Request({
      url: "/mini/user/login_registor_by_phone/v1",
      method: "POST",
      data,
    });
  },

  /**
   * 登出
   * https://wiki.corp.vipshop.com/pages/viewpage.action?pageId=1334416628
   */
  tryLogout(data) {
    return Request({
      url: "/mini/user/try_log_out/v1",
      method: "POST",
      data,
    });
  },
};
