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
  }

  getCurrentDate = () => {
    return this.cashBookModel.getCurrentDate();
  };
}

export default BaseController;
