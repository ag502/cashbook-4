import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

import { saveButtonSmall, saveActiveButtonSmall } from '../icons';

class HistoryStatics extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    this.initStaticsInfo();
    this.isIncomeChecked = true;
    this.isExpenditureChecked = true;
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.initStaticsInfo
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_RECORD_DATA,
      this,
      this.handleDataChanged
    );
  }
  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.FETCHED_DATA, this);
    this.observer.unsubscribe(notifyTypes.CHANGED_RECORD_DATA, this);
  }

  initStaticsInfo = () => {
    const { totalCount, totalIncome, totalExpenditure } =
      this.controller.getRecordsStatistics();
    this.totalCount = totalCount;
    this.totalIncome = totalIncome;
    this.totalExpenditure = totalExpenditure;

    this.render();
  };

  handleDataChanged = () => {
    const { totalCount } = this.controller.getRecordsStatistics();
    this.totalCount = totalCount;

    this.render();
  };

  handleIncomeDisplayToggle = () => {
    this.isIncomeChecked = !this.isIncomeChecked;
    const currentOptions = this.controller.getRecordIncludeOptions();
    currentOptions.income = this.isIncomeChecked;
    this.controller.setRecordIncludeOptions(currentOptions);
  };
  handleExpenditureDisplayToggle = () => {
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
    this.setHTML(/*html*/ `
        <div class="left">
            <strong>전체 내역 ${this.totalCount} 건</strong>
        </div>

        <div class="right">
          <div class="income ${
            this.isIncomeChecked === true ? 'active' : ''
          }" id="income-display-toggle-btn">
            <button>${
              this.isIncomeChecked === true
                ? saveActiveButtonSmall
                : saveButtonSmall
            }</button> 수입 ${this.totalIncome}
          </div>
          <div class="expenditure ${
            this.isExpenditureChecked === true ? 'active' : ''
          }"id='expenditure-display-toggle-btn'>
            <button >${
              this.isExpenditureChecked === true
                ? saveActiveButtonSmall
                : saveButtonSmall
            }</button> 지출 ${this.totalExpenditure}
          </div>
        <div>
    `);

    this.addEvents();
  };
}

customElements.define('history-statics', HistoryStatics);

export default customElements.get('history-statics');
