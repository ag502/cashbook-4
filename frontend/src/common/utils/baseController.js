import cashBookModel from '@/models/cashBookModel';
import userModel from '@/models/userModel';
import observer from '@/common/utils/observer';

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
