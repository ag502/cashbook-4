import chartController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import PieChart from './chart/pie';

class MainChart extends HTMLElement {
  constructor() {
    super();
    this.chartController = chartController;
    this.observer = observer;
    this.data = this.chartController.getAccountsByCateogroy();
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleFetchedData
    );
    this.render();
  }

  handleFetchedData = () => {
    this.data = this.chartController.getAccountsByCateogroy();
    this.render();
  };

  render = () => {
    this.setHTML(/*html*/ `
      <div class='main-chart--container'>
        <pie-chart width='300' height='300' config=${JSON.stringify(
          this.data
        )}></pie-chart>
      </div>
    `);
  };
}

customElements.define('main-chart', MainChart);
export default customElements.get('main-chart');
