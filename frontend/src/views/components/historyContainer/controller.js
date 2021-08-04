import BaseController from '@/common/utils/baseController';
import notifyTypes from '@/common/utils/notifyTypes';

import errorTypes from '@/common/utils/error';

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

      dayAccounts[time].push(account);
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
      if (account.price >= 0) {
        return (totalIncome += account.price);
      }
      return (totalExpenditure -= account.price);
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

  getPayments = () => {
    return this.userModel.getPayments();
  };

  addPayment = async (name) => {
    const result = await this.userModel.addPayment(name);
    if (!result.success) {
      const { error } = result;
      if (error.errorType === errorTypes.AlreadyExist) {
        return { success: false, message: '이미 같은 결제수단이 존재합니다!' };
      } else {
        return {
          success: false,
          message: '예끼치 못한 에러가 발생하였습니다!',
        };
      }
    }
    return result;
  };
}

export default new HistoryContainerController();
