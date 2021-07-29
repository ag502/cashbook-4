import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

import { saveButtonSmall, saveActiveButtonSmall } from '../icons';

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

  handleIncomeDisplayToggle = () => {
    console.log('income toggle');
    this.isIncomeChecked = !this.isIncomeChecked;
    const currentOptions = this.controller.getRecordIncludeOptions();
    currentOptions.income = this.isIncomeChecked;
    this.controller.setRecordIncludeOptions(currentOptions);
  };
  handleExpenditureDisplayToggle = () => {
    console.log('expenditure toggle');
    this.isExpenditureChecked = !this.isExpenditureChecked;
    const currentOptions = this.controller.getRecordIncludeOptions();
    currentOptions.expenditure = this.isExpenditureChecked;
    this.controller.setRecordIncludeOptions(currentOptions);
  };

  addEvents = () => {
    const $incomeDisplayToggleBtn = this.querySelector(
      '#income-display-toggle-btn'
    );

    const $expenditureDisplayToggleBtn = this.querySelector(
      '#expenditure-display-toggle-btn'
    );

    $incomeDisplayToggleBtn.addEventListener(
      'click',
      this.handleIncomeDisplayToggle
    );
    $expenditureDisplayToggleBtn.addEventListener(
      'click',
      this.handleExpenditureDisplayToggle
    );
  };

  render = () => {
    this.innerHTML = /*html*/ `
        <div class="left">
            <strong>전체 내역 ${this.totalCount} 건</strong>
        </div>

        <div class="right">
          <div class="income ${this.isIncomeChecked === true ? 'active' : ''}">
            <button id="income-display-toggle-btn">${
              this.isIncomeChecked === true
                ? saveActiveButtonSmall
                : saveButtonSmall
            }</button> 수입 ${this.totalIncome}
          </div>
          <div class="expenditure ${
            this.isExpenditureChecked === true ? 'active' : ''
          }">
          <button id='expenditure-display-toggle-btn'>${
            this.isExpenditureChecked === true
              ? saveActiveButtonSmall
              : saveButtonSmall
          }</button> 지출 ${this.totalExpenditure}
          </div>
        <div>
    `;

    this.addEvents();
  };
}

customElements.define('history-statics', HistoryStatics);

export default customElements.get('history-statics');
