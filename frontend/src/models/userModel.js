import authAPI from '../api/authAPI.js';

import observer from '@/common/utils/observer';
import notifyTypes from '../common/utils/notifyTypes';

class UserModel {
  constructor() {
    this.isLogin = null;
    this.observer = observer;
    this.authAPI = authAPI;
    this.init();
  }

  init = async () => {
    this.isLogin = await this.checkLogin();
    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    this.observer.subscribe(notifyTypes.CLICK_LOGOUT, this, this.logout);
  };

  checkLogin = async () => {
    const result = await authAPI.checkLogin();
    return result.success;
  };

  login = async ({ nickname, password }) => {
    const result = await authAPI.loginAPI({ nickname, password });
    if (result.success) {
      this.isLogin = true;
      this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
    }
    return result;
  };

  logout = () => {
    authAPI.logout();
    this.isLogin = false;
    this.observer.notify(notifyTypes.INIT_USER);
  };

  register = async ({ nickname, password }) => {
    const result = await authAPI.registerAPI({ nickname, password });
    return result;
  };

  getIsLogin = () => {
    return this.isLogin;
  };
}

export default new UserModel();
