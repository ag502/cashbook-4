import cashBookModel from '@/models/CashBookModel';

class HeaderController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  handlePrevBtnClick = () => {
    this.cashBookModel.moveMonth(-1);
  };

  getCurrentMonth() {
    return this.cashBookModel.getCurrentDate().getMonth() + 1;
  }
}

export default new HeaderController();
