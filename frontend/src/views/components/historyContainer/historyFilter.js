import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

class HistoryFilter extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.totalCount = 0;
    this.totalIncome = 0;
    this.totalExpenditure = 0;
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
            <strong>전체 내역 ${this.totalCount}</strong>
        </div>

        <div class="right">

        <div>
    `;
  };
}

customElements.define('history-filter', HistoryFilter);

export default customElements.get('history-filter');
