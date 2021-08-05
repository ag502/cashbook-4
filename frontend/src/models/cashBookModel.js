import observer from '@/common/utils/observer';
import records from './mockDatas';

import notifyTypes from '@/common/utils/notifyTypes';
import accountAPI from '../api/accountAPI';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.accounts = [];
    this.yearCategoryAccount = {};

    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.accounts = await this._fecthAccountsByMonth();
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  _fecthAccountsByMonth = async () => {
    const result = await accountAPI.getAccountByMonth(this.currentDate);
    return result.success ? result.accounts : [];
  };

  _fetchYearAccountByCategory = async (categoryId) => {
    const curDate = this.currentDate;
    const result = await accountAPI.getYearAccountByCategory(
      curDate,
      categoryId
    );
    return result.success ? result.result : {};
  };

  addNewAccountData = async (data) => {
    const result = await accountAPI.addAccount(data);
    this.accounts = await this._fecthAccountsByMonth();
    return result;
  };

  updateAccountData = async (data) => {
    const result = await accountAPI.editAccount(data);
    this.accounts = await this._fecthAccountsByMonth();
    return result;
  };

  deleteAccountData = async (accountId) => {
    const result = await accountAPI.deleteAccount(accountId);
    this.accounts = await this._fecthAccountsByMonth();
    return result;
  };

  moveMonth = async (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify(notifyTypes.CHANGED_CURRENT_DATE, this.currentDate);

    this.accounts = await this._fecthAccountsByMonth();
    this.observer.notify(notifyTypes.FETCHED_DATA);
  };

  changeCategory = async (id) => {
    this.yearCategoryAccount = await this._fetchYearAccountByCategory(id);
    this.observer.notify(notifyTypes.CLICK_CATEGORY, id);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getAccounts = () => {
    return this.accounts;
  };

  getYearCategoryAccount = () => {
    return this.yearCategoryAccount;
  };
}

export default new CashBookModel();
