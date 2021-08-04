import BaseController from '@/common/utils/baseController';
import notifyTypes from '@/common/utils/notifyTypes';

const initalIncludeOptions = {
  income: true,
  expenditure: true,
};

class HistoryContainerController extends BaseController {
  constructor() {
    super();
    this.accountsIncludeOptions = { ...initalIncludeOptions };
  }

  init = () => {
    this.resetIncludeOptions();
  };

  resetIncludeOptions = () => {
    this.accountsIncludeOptions = { ...initalIncludeOptions };
  };

  getAccounts = () => {
    const accounts = this.cashBookModel.getAccounts();
    const filteredAccounts = accounts.filter((account) => {
      if (account.price >= 0) {
        return this.accountsIncludeOptions.income ? true : false;
      }
      return this.accountsIncludeOptions.expenditure ? true : false;
    });
    return filteredAccounts;
  };

  getDayAccounts = () => {
    const accounts = this.getAccounts();
    const dayAccounts = {};

    accounts.forEach((account) => {
      const time = new Date(account.date).getTime();
      if (!dayAccounts[time]) {
        dayAccounts[time] = [];
      }

      dayAccounts[time].push({ ...account, price: Number(account.price) });
    });

    return dayAccounts;
  };

  getAccountsStatistics = () => {
    const accounts = this.getAccounts();

    let totalCount = 0;
    let totalIncome = 0;
    let totalExpenditure = 0;

    accounts.forEach((account) => {
      totalCount += 1;
      const numPrice = Number(account.price);
      if (numPrice >= 0) {
        return (totalIncome += numPrice);
      }
      return (totalExpenditure -= numPrice);
    });

    return { totalCount, totalIncome, totalExpenditure };
  };

  getAccountIncludeOptions = () => {
    return this.accountsIncludeOptions;
  };

  setAccountIncludeOptions = (accountsIncludeOptions) => {
    this.accountsIncludeOptions = accountsIncludeOptions;
    this.observer.notify(notifyTypes.CHANGED_DATA_FILTER);
  };
}

export default new HistoryContainerController();
