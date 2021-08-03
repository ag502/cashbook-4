import chartController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import PieChart from './chart/pie';
import CategoryBadge from '../categoryBadge';

class MainChart extends HTMLElement {
  constructor() {
    super();
    this.chartController = chartController;
    this.observer = observer;
    [this.total, this.data] = this.chartController.getPieChartData();
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
    [this.total, this.data] = this.chartController.getPieChartData();
    this.render();
  };

  render = () => {
    const curMonth = this.chartController.getCurrentDate().getMonth() + 1;
    this.setHTML(/*html*/ `
      <div class='chart--container'>
        <pie-chart 
          width='300' 
          height='300' 
          config=${JSON.stringify(this.data)}>
        </pie-chart>
        <div class='main-chart--info'>
          <div class='main-chart--info--header'>
            ${curMonth}월 달 지출 금액 ${this.total.toLocaleString()}
          </div>
          ${this.data
            .map(
              ({ categoryId, percent, price }) => /*html*/ `
                <div class='main-chart--info-item'>
                  <category-badge categoryId=${categoryId}></category-badge>
                  <div class='price-info'>
                    <span class='price-percent'>${percent} %</span>
                    <span class='price-price'>${price.toLocaleString()}</span>
                  </div>
                </div>
            `
            )
            .join('')}
        </div>
      </div>
    `);
  };
}

customElements.define('main-chart', MainChart);
export default customElements.get('main-chart');
