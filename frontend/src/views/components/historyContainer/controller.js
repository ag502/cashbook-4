import cashBookModel from '@/models/CashBookModel';

class HistoryContainerController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }
}

export default new HistoryContainerController();
