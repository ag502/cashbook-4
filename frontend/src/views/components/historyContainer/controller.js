import cashBookModel from '@/models/CashBookModel';

class HeaderController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }
}

export default new HeaderController();
