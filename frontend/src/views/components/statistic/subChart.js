import LineChart from '@/views/components/statistic/chart/line';
import chartController from './controller';
import observer from '@/common/utils/observer';
import DayAccount from '@/views/components/dayAccount';
import notifyTypes from '@/common/utils/notifyTypes';

class SubChart extends HTMLElement {
  constructor() {
    super();
    this.isShow = false;
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
      notifyTypes.CLICK_CATEGORY,
      this,
      this.handleFetchedData
    );
    this.render();
  }

  handleFetchedData = (category) => {
    if (category === 0) {
      this.isShow = false;
    } else {
      this.monthExpByCategory =
        this.chartController.getMonthExpByCategory(category);
      this.isShow = true;
    }
    this.render();
  };

  render = () => {
    const dayAccountKeys = Object.keys(this.monthExpByCategory).sort(
      (a, b) => b - a
    );

    if (this.isShow) {
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
    }`);
      dayAccountKeys.forEach((key) => {
        const $dayAccount = new DayAccount({
          date: key,
          accounts: this.monthExpByCategory[key],
        });
        this.appendChild($dayAccount);
      });
    } else {
      this.setHTML('');
    }
  };
}

customElements.define('sub-chart', SubChart);
export default customElements.get('sub-chart');
