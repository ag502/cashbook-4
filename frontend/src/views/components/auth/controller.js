import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import userModel from '@/models/userModel';

import errorTypes from '@/common/utils/error';

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

  handleLogin = async ({ nickname, password }) => {
    const result = await this.userModel.login({ nickname, password });
    if (!result.success) {
      const { error } = result;
      if (error.errorType === errorTypes.LoginFailed) {
        return { success: false, message: '로그인에 실패하였습니다!' };
      } else {
        return {
          success: false,
          message: '예끼치 못한 에러가 발생하였습니다!',
        };
      }
    }
    return result;
  };

  handleRegister = async ({ nickname, password }) => {
    const result = await this.userModel.register({ nickname, password });
    return result.success;
  };

  getContentTypes = () => {
    return this.contentTypes;
  };
}

export default new AuthController();
