import cashBookModel from '@/models/cashBookModel';
import observer from '@/common/utils/observer';

class BaseController {
  constructor() {
    this.cashBookModel = cashBookModel;
    this.observer = observer;
  }

  getCurrentDate = () => {
    return this.cashBookModel.getCurrentDate();
  };
}

export default BaseController;
