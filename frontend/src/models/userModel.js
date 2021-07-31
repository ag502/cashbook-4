import observer from '@/common/utils/observer';
import notifyTypes from '../common/utils/notifyTypes';

class UserModel {
  constructor() {
    this.isLogin = null;
    this.observer = observer;
    this.init();
  }

  init = async () => {
    this.isLogin = await this.checkLogin();
    this.observer.notify(notifyTypes.INIT_USER, this.isLogin);
  };

  checkLogin = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 300);
    });
  };

  login = ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 300);
    });
  };

  register = async ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 300);
    });
  };

  getIsLogin = () => {
    return this.isLogin;
  };
}

export default new UserModel();
