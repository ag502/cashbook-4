import cashBookModel from '@/models/cashBookModel';
import userModel from '@/models/userModel';

class HeaderController {
  constructor() {
    this.cashBookModel = cashBookModel;
    this.userModel = userModel;
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
  getIsLogin() {
    return this.userModel.getIsLogin();
  }
}

export default new HeaderController();
