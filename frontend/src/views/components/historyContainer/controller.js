import cashBookModel from '@/models/cashBookModel';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

class HistoryContainerController {
  constructor() {
    this.cashBookModel = cashBookModel;
    this.observer = observer;
    this.recordIncludeOptions = {
      income: true,
      expenditure: true,
    };
  }

  init() {
    const currentOptions = this.getRecordIncludeOptions();
    currentOptions.income = true;
    currentOptions.expenditure = true;
    this.recordIncludeOptions = currentOptions;
  }

  getCurrentDate() {
    return this.cashBookModel.getCurrentDate();
  }

  getRecords() {
    const records = this.cashBookModel.getRecords();
    const filteredRecords = records.filter((record) => {
      if (record.price >= 0) {
        return this.recordIncludeOptions.income ? true : false;
      }
      return this.recordIncludeOptions.expenditure ? true : false;
    });
    return filteredRecords;
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

  getRecordIncludeOptions = () => {
    return this.recordIncludeOptions;
  };
  setRecordIncludeOptions = (recordIncludeOptions) => {
    this.recordIncludeOptions = recordIncludeOptions;
    this.observer.notify(notifyTypes.CHANGED_RECORD_DATA);
  };
}

export default new HistoryContainerController();
