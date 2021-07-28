import cashBookModel from '@/models/cashBookModel';

class CalendarController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  getCurrentPaymentInfo = () => {
    const paymentInfoPerDay = {};
    let totalIncome = 0;
    let totalExpenditure = 0;
    this.cashBookModel.getCurrentPaymentInfo().forEach(({ date, price }) => {
      if (!paymentInfoPerDay[date]) {
        paymentInfoPerDay[date] = { income: 0, expenditure: 0 };
      }
      if (price < 0) {
        paymentInfoPerDay[date].expenditure += price;
        totalExpenditure += price;
      } else {
        paymentInfoPerDay[date].income += price;
        totalIncome += price;
      }
    });

    paymentInfoPerDay.totalIncome = totalIncome;
    paymentInfoPerDay.totalExpenditure = totalExpenditure;

    return paymentInfoPerDay;
  };
}

export default new CalendarController();
