import observer from '@/common/utils/observer';

class CashBookModel {
  constructor() {
    this.observer = observer;
    this.currentDate = null;
    this.init();
  }

  init = () => {
    this.currentDate = new Date();
  };

  moveMonth = (monthCount) => {
    this.currentDate.setMonth(this.currentDate.getMonth() + monthCount);
    this.observer.notify('currentDate-changed', this.currentDate);
  };

  getCurrentDate = () => {
    return this.currentDate;
  };
}

export default new CashBookModel();
