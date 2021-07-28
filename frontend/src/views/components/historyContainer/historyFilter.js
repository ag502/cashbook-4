import historyContainerController from './controller';
import observer from '@/common/utils/observer';

class HistoryFilter extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.totalIncome = 0;
    this.totalExpenditure = 0;
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe('model-init', this, this.handleModelInit);
  }

  handleModelInit = () => {
    const { totalIncome, totalExpenditure } =
      this.controller.getRecordsStatistics();

    this.totalIncome = totalIncome;
    this.totalExpenditure = totalExpenditure;

    this.render();
  };

  render = () => {
    this.innerHTML = /*html*/ `
        <div class="left">

        </div>

        <div class="right">

        <div>
    `;
  };
}

customElements.define('history-filter', HistoryFilter);

export default customElements.get('history-filter');
