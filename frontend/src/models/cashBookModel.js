import observer from '@/common/utils/observer';
import data from './api';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.paymentInfo = null;
    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.paymentInfo = await this._fecthPaymentInfo();
    observer.notify('fetch-data');
  };

  _fecthPaymentInfo = () => {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle(data);
      }, 1000);
    });
  };

  moveMonth = (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify('currentDate-changed', this.currentDate);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getPaymentInfo = () => {
    return this.paymentInfo;
  };
}

export default new CashBookModel();
