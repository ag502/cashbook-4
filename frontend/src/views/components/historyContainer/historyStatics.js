import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

import { saveButtonLarge, saveActiveButtonLarge } from '../icons';

class HistoryStatics extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.totalCount = 0;
    this.totalIncome = 0;
    this.totalExpenditure = 0;
    this.isIncomeChecked = true;
    this.isExpenditureChecked = true;
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleFetchedData
    );
  }

  handleFetchedData = () => {
    const { totalCount, totalIncome, totalExpenditure } =
      this.controller.getRecordsStatistics();
    this.totalCount = totalCount;
    this.totalIncome = totalIncome;
    this.totalExpenditure = totalExpenditure;

    this.render();
  };

  render = () => {
    this.innerHTML = /*html*/ `
        <div class="left">
            <strong>전체 내역 ${this.totalCount} 건</strong>
        </div>

        <div class="right">
          <div class="income ${this.isIncomeChecked === true ? 'active' : ''}">
            <button>${
              this.isIncomeChecked === true
                ? saveActiveButtonLarge
                : saveButtonLarge
            }</button> 수입 ${this.totalIncome}
          </div>
          <div class="expenditure ${
            this.isExpenditureChecked === true ? 'active' : ''
          }">
          <button>${
            this.isExpenditureChecked === true
              ? saveActiveButtonLarge
              : saveButtonLarge
          }</button> 지출 ${this.totalExpenditure}
          </div>
        <div>
    `;
  };
}

customElements.define('history-statics', HistoryStatics);

export default customElements.get('history-statics');
