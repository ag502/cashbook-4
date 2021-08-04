import observer from '@/common/utils/observer';
import records from './mockDatas';

import notifyTypes from '@/common/utils/notifyTypes';
import accountAPI from '../api/accountAPI';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.accounts = [];

    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.accounts = await this._fecthAccountsByMonth();
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  _fecthAccountsByMonth = async (month = this.currentDate.getMonth() + 1) => {
    const result = await accountAPI.getAccountByMonth();
    return result;
  };

  moveMonth = async (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify(notifyTypes.CHANGED_CURRENT_DATE, this.currentDate);

    this.accounts = await this._fecthAccountsByMonth(
      this.currentDate.getMonth() + 1
    );
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getAccounts = () => {
    return this.accounts;
  };
}

export default new CashBookModel();
