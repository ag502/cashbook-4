import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import userModel from '@/models/userModel';

class AuthController {
  constructor() {
    this.observer = observer;
    this.userModel = userModel;
    this.contentTypes = {
      REGISTER: 'register',
      LOGIN: 'LOGIN',
    };
  }

  showRegisterView = () => {
    this.observer.notify(
      notifyTypes.CHANGED_LOGIN_CONTENT,
      this.contentTypes.REGISTER
    );
  };

  showLoginView = () => {
    this.observer.notify(
      notifyTypes.CHANGED_LOGIN_CONTENT,
      this.contentTypes.LOGIN
    );
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

  getContentTypes = () => {
    return this.contentTypes;
  };
}

export default new AuthController();
