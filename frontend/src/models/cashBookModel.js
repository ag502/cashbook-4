import observer from '@/common/utils/observer';
import records from './mockDatas';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.records = [];
    this.init();
  }

  init = async () => {
    this.currentDate = new Date();
    this.records = await this._fetchRecordsByMonth();
    this.observer.notify('model-init');
  };

  moveMonth = (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify('currentDate-changed', this.currentDate);
  };

  _fetchRecordsByMonth = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(records);
      });
    }, 100);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };

  getRecords = () => {
    return this.records;
  };
}

export default new CashBookModel();
