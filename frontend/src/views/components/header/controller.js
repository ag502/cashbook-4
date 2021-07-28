import cashBookModel from '@/models/cashBookModel';

class HeaderController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  handlePrevBtnClick = async () => {
    await this.cashBookModel.moveMonth(-1);
  };

  handleNextBtnClick = async () => {
    await this.cashBookModel.moveMonth(+1);
  };

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }
}

export default new HeaderController();
