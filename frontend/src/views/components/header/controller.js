import cashBookModel from '@/models/CashBookModel';

class HeaderController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  handlePrevBtnClick = () => {
    this.cashBookModel.moveMonth(-1);
  };

  handleNextBtnClick = () => {
    this.cashBookModel.moveMonth(+1);
  };

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }
}

export default new HeaderController();
