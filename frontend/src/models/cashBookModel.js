import observer from '@/common/utils/observer';
import { seven, eight } from './api';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.paymentInfo = [];
    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.paymentInfo = await this._fecthPaymentInfo(7);
    this.observer.notify('fetch-data');
  };

  _fecthPaymentInfo = (type = 7) => {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        if (type === 7) {
          resovle(seven);
        } else {
          resovle(eight);
        }
      }, 1000);
    });
  };

  moveMonth = async (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify('currentDate-changed', this.currentDate);
    this.paymentInfo = await this._fecthPaymentInfo(
      this.currentDate.getMonth() + 1 === 8 ? 8 : 7
    );
    this.observer.notify('fetch-data', this.paymentInfo);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getCurrentPaymentInfo = () => {
    return this.paymentInfo;
  };
}

export default new CashBookModel();
