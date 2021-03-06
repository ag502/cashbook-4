import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

import { saveButtonSmall, saveActiveButtonSmall } from '../icons';

class HistoryStatistics extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    this.initStatisticsInfo();
    this.isIncomeChecked = true;
    this.isExpenditureChecked = true;
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.initStatisticsInfo
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_DATA_FILTER,
      this,
      this.handleDataChanged
    );

    this.observer.subscribe(
      notifyTypes.CHANGED_CURRENT_DATE,
      this,
      this.initStatisticsInfo
    );
  }
  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.FETCHED_DATA, this);
    this.observer.unsubscribe(notifyTypes.CHANGED_DATA_FILTER, this);
  }

  initStatisticsInfo = () => {
    this.controller.init();
    this.isIncomeChecked = true;
    this.isExpenditureChecked = true;

    const { totalCount, totalIncome, totalExpenditure } =
      this.controller.getAccountsStatistics();
    this.totalCount = totalCount;
    this.totalIncome = totalIncome;
    this.totalExpenditure = totalExpenditure;

    this.render();
  };

  handleDataChanged = () => {
    const { totalCount } = this.controller.getAccountsStatistics();
    this.totalCount = totalCount;

    this.render();
  };

  handleIncomeDisplayToggle = () => {
    this.isIncomeChecked = !this.isIncomeChecked;
    const currentOptions = this.controller.getAccountIncludeOptions();
    currentOptions.income = this.isIncomeChecked;
    this.controller.setAccountIncludeOptions(currentOptions);
  };

  handleExpenditureDisplayToggle = () => {
    this.isExpenditureChecked = !this.isExpenditureChecked;
    const currentOptions = this.controller.getAccountIncludeOptions();
    currentOptions.expenditure = this.isExpenditureChecked;
    this.controller.setAccountIncludeOptions(currentOptions);
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
            <strong>?????? ?????? ${this.totalCount} ???</strong>
        </div>

        <div class="right">
          <div class="income ${
            this.isIncomeChecked === true ? 'active' : ''
          }" id="income-display-toggle-btn">
            <button>${
              this.isIncomeChecked === true
                ? saveActiveButtonSmall
                : saveButtonSmall
            }</button> ?????? ${this.totalIncome.toLocaleString()}
          </div>
          <div class="expenditure ${
            this.isExpenditureChecked === true ? 'active' : ''
          }"id='expenditure-display-toggle-btn'>
            <button >${
              this.isExpenditureChecked === true
                ? saveActiveButtonSmall
                : saveButtonSmall
            }</button> ?????? ${this.totalExpenditure.toLocaleString()}
          </div>
        <div>
    `);

    this.addEvents();
  };
}

customElements.define('history-statistics', HistoryStatistics);

export default customElements.get('history-statistics');
