import observer from '@/common/utils/observer';
import records from './mockDatas';
import { seven, eight } from './api';

import notifyTypes from '@/common/utils/notifyTypes';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.records = [];
    this.paymentInfo = [];
    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.records = await this._fetchRecordsByMonth();
    this.paymentInfo = await this._fecthPaymentInfo(7);
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  _fecthPaymentInfo = (month = this.currentDate.getMonth() - 1) => {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        if (month === 7) {
          resovle(seven);
        } else {
          resovle(eight);
        }
      }, 1000);
    });
  };

  moveMonth = async (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify(notifyTypes.CHANGED_CURRENT_DATE, this.currentDate);

    this.paymentInfo = await this._fecthPaymentInfo(
      this.currentDate.getMonth() + 1 === 8 ? 8 : 7
    );
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  _fetchRecordsByMonth = (month = this.currentDate.getMonth() - 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(records);
      });
    }, 100);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getRecords = () => {
    return this.records;
  };
  getCurrentPaymentInfo = () => {
    return this.paymentInfo;
  };
}

export default new CashBookModel();
