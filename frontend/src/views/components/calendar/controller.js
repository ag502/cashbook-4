import cashBookModel from '@/models/cashBookModel';

class CalendarController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  getCurrentPaymentInfo = () => {
    const paymentInfoPerDay = {};
    // let
    // this.cashBookModel.getCurrentPaymentInfo().forEach(({date, price}) => {

    // })
    return this.cashBookModel.getPaymentInfo();
  };
}

export default new CalendarController();
