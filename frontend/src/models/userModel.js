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

    this.observer.subscribe(notifyTypes.SUBMIT_LOGIN, this, this.login);

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
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 300);
    }).then((result) => {
      this.isLogin = result.success;
      location.hash = '#/';
    });
  };

  getIsLogin = () => {
    return this.isLogin;
  };
}

export default new UserModel();
