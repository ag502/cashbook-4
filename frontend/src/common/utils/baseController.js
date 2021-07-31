import cashBookModel from '@/models/cashBookModel';
import userModel from '@/models/userModel';
import observer from '@/common/utils/observer';
import notifyTypes from './notifyTypes';

import Login from '@/views/components/login';

class BaseController {
  constructor() {
    this.cashBookModel = cashBookModel;
    this.userModel = userModel;

    this.observer = observer;

    this.observer.subscribe(notifyTypes.INIT_USER, this, this.handleInitUser);
  }

  handleInitUser = () => {
    const isLogin = this.userModel.getIsLogin(); // true or false
    if (isLogin) {
      return;
    }
    const $app = document.querySelector('#app');
    const $login = new Login();
    $app.appendChild($login);
  };

  getCurrentDate = () => {
    return this.cashBookModel.getCurrentDate();
  };
}

export default BaseController;
