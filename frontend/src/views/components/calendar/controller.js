import BaseController from '@/common/utils/baseController';
import { parsingDate } from '@/common/utils/functions';

class CalendarController extends BaseController {
  constructor() {
    super();
  }

  getCurAccountsInfo = () => {
    const accountInfoPerDay = {};
    let totalIncome = 0;
    let totalExpenditure = 0;

    this.cashBookModel.getAccounts().forEach(({ date, price }) => {
      const parsedDate = parsingDate(date);
      if (!accountInfoPerDay[parsedDate]) {
        accountInfoPerDay[parsedDate] = { income: 0, expenditure: 0 };
      }
      if (price < 0) {
        accountInfoPerDay[parsedDate].expenditure += price;
        totalExpenditure += price;
      } else {
        accountInfoPerDay[parsedDate].income += price;
        totalIncome += price;
      }
    });

    accountInfoPerDay.totalIncome = totalIncome;
    accountInfoPerDay.totalExpenditure = totalExpenditure;

    return accountInfoPerDay;
  };
}

export default new CalendarController();
