import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import userModel from '@/models/userModel';

class LoginController {
  constructor() {
    this.observer = observer;
    this.userModel = userModel;
  }

  showRegisterView = () => {
    this.observer.notify(notifyTypes.CHANGED_LOGIN_CONTENT, 'register');
  };

  showLoginView = () => {
    this.observer.notify(notifyTypes.CHANGED_LOGIN_CONTENT, 'login');
  };

  handleLogin = async ({ email, password }) => {
    const result = await this.userModel.login({ email, password });
    if (result.success) {
      return (location.hash = '#/');
    } else {
      return false;
    }
  };
  handleRegister = async ({ email, password }) => {
    const result = await this.userModel.register({ email, password });
    return result.success;
  };
}

export default new LoginController();
