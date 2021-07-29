import observer from '@/common/utils/observer';
import records from './mockDatas';

import notifyTypes from '@/common/utils/notifyTypes';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.accounts = [];

    this.records = [];
    this.paymentInfo = [];

    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.accounts = await this._fecthAccountsByMonth();

    this.records = await this._fetchRecordsByMonth();
    // this.paymentInfo = await this._fecthPaymentInfo(7);

    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  _fecthAccountsByMonth = (month = this.currentDate.getMonth() + 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (month === 7) {
          resolve(records);
        } else {
          resolve([]);
        }
      });
    }, 1000);
  };

  moveMonth = async (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify(notifyTypes.CHANGED_CURRENT_DATE, this.currentDate);

    this.accounts = await this._fecthAccountsByMonth(
      this.currentDate.getMonth() + 1
    );

    // this.paymentInfo = await this._fecthPaymentInfo(
    //   this.currentDate.getMonth() + 1 === 8 ? 8 : 7
    // );

    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getAccounts = () => {
    return this.accounts;
  };

  getRecords = () => {
    return this.records;
  };

  // getCurrentPaymentInfo = () => {
  //   return this.paymentInfo;
  // };

  _fetchRecordsByMonth = (month = this.currentDate.getMonth() - 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(records);
      });
    }, 100);
  };

  // _fecthPaymentInfo = (month = this.currentDate.getMonth() - 1) => {
  //   return new Promise((resovle, reject) => {
  //     setTimeout(() => {
  //       if (month === 7) {
  //         resovle(seven);
  //       } else {
  //         resovle(eight);
  //       }
  //     }, 1000);
  //   });
  // };
}

export default new CashBookModel();
