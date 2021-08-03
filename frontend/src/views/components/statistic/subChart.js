import LineChart from '@/views/components/statistic/chart/line';
import chartController from './controller';
import observer from '@/common/utils/observer';
import DayAccount from '@/views/components/dayAccount';
import notifyTypes from '@/common/utils/notifyTypes';

class SubChart extends HTMLElement {
  constructor() {
    super();
    this.chartController = chartController;
    this.observer = observer;
    this.monthExpByCategory = this.chartController.getMonthExpByCategory(5);
    this.lineData = {
      datasets: {
        data: [20, 100, 1000, 10000, 23453, 53533, 123213, 99999],
        backgroundColor: ['blue'],
      },
    };
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
    this.monthExpByCategory = this.chartController.getMonthExpByCategory(5);
    this.render();
  };

  render = () => {
    const dayAccountKeys = Object.keys(this.monthExpByCategory).sort(
      (a, b) => b - a
    );

    this.setHTML(/*html*/ `
      <div class='chart--container sub'>
        <line-chart 
          width='750'
          height='500' 
          config=${JSON.stringify(this.lineData)}
          style='width:100%;'
        >
        </line-chart>
      </div>
    `);

    dayAccountKeys.forEach((key) => {
      const $dayAccount = new DayAccount({
        date: key,
        accounts: this.monthExpByCategory[key],
      });
      this.appendChild($dayAccount);
    });
  };
}

customElements.define('sub-chart', SubChart);
export default customElements.get('sub-chart');
