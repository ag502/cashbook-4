import cashBookModel from '@/models/cashBookModel';
import BaseController from '@/common/utils/baseController';

class CalendarController extends BaseController {
  constructor() {
    super();
  }

  getCurAccountsInfo = () => {
    const accountInfoPerDay = {};
    let totalIncome = 0;
    let totalExpenditure = 0;

    this.cashBookModel.getAccounts().forEach(({ date, price }) => {
      if (!accountInfoPerDay[date]) {
        accountInfoPerDay[date] = { income: 0, expenditure: 0 };
      }
      if (price < 0) {
        accountInfoPerDay[date].expenditure += price;
        totalExpenditure += price;
      } else {
        accountInfoPerDay[date].income += price;
        totalIncome += price;
      }
    });

    accountInfoPerDay.totalIncome = totalIncome;
    accountInfoPerDay.totalExpenditure = totalExpenditure;

    return accountInfoPerDay;
  };
}

export default new CalendarController();
