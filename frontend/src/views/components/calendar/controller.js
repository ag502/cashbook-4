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
      const numPrice = Number(price);
      if (!accountInfoPerDay[parsedDate]) {
        accountInfoPerDay[parsedDate] = { income: 0, expenditure: 0 };
      }
      if (numPrice < 0) {
        accountInfoPerDay[parsedDate].expenditure += numPrice;
        totalExpenditure += numPrice;
      } else {
        accountInfoPerDay[parsedDate].income += numPrice;
        totalIncome += numPrice;
      }
    });

    accountInfoPerDay.totalIncome = totalIncome;
    accountInfoPerDay.totalExpenditure = totalExpenditure;

    return accountInfoPerDay;
  };
}

export default new CalendarController();
