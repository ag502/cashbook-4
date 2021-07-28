import cashBookModel from '@/models/CashBookModel';

class HistoryContainerController {
  constructor() {
    this.cashBookModel = cashBookModel;
  }

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }

  getRecords() {
    return this.cashBookModel.getRecords();
  }

  getDayRecords = () => {
    const records = this.getRecords();
    const dayRecords = {};

    records.forEach((record) => {
      const time = record.date.getTime();
      if (!dayRecords[time]) {
        dayRecords[time] = [];
      }

      dayRecords[time].push(record);
    });

    return dayRecords;
  };
}

export default new HistoryContainerController();
