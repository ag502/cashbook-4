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

  getRecordsStatistics = () => {
    const records = this.getRecords();

    let totalCount = 0;
    let totalIncome = 0;
    let totalExpenditure = 0;

    records.forEach((record) => {
      totalCount += 1;
      if (record.price >= 0) {
        return (totalIncome += record.price);
      }
      return (totalExpenditure -= record.price);
    });

    return { totalCount, totalIncome, totalExpenditure };
  };
}

export default new HistoryContainerController();
