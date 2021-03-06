import chartController from './controller';
import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import PieChart from './chart/pie';
import CategoryBadge from '../categoryBadge';
import { emptyImage } from '../icons';

class MainChart extends HTMLElement {
  constructor() {
    super();
    this.chartController = chartController;
    this.observer = observer;
    this.curSelected = null;
    [this.total, this.data] = this.chartController.getPieChartData();
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleFetchedData
    );
    this.render();
    this.addEvents();
  }

  handleFetchedData = () => {
    [this.total, this.data] = this.chartController.getPieChartData();
    this.render();
  };

  addEvents = () => {
    this.addEventListener('click', async ({ target }) => {
      const $item = target.closest('.main-chart--info-item');
      if ($item) {
        if ($item === this.curSelected) {
          $item.toggleClass('active');
          this.curSelected = null;
        } else {
          this.curSelected && this.curSelected.removeClass('active');
          $item.addClass('active');
          this.curSelected = $item;
        }
        await this.chartController.handleCategoryClick(
          this.curSelected ? $item.id : 0
        );
      }
    });
  };

  render = () => {
    const curMonth = this.chartController.getCurrentDate().getMonth() + 1;
    this.setHTML(/*html*/ `
      <div class='chart--container'>
        ${
          this.data.length === 0
            ? emptyImage
            : /*html*/ `
            <pie-chart 
              width='300' 
              height='300' 
              config=${JSON.stringify(this.data)}>
            </pie-chart>
            <div class='main-chart--info'>
              <div class='main-chart--info--header'>
                ${curMonth}월 달 지출 금액 ${this.total.toLocaleString()}
              </div>
              <div class='main-chart--info-item-container'>
                ${this.data
                  .map(
                    ({ categoryId, percent, price }) => /*html*/ `
                      <div class='main-chart--info-item' id=${categoryId}>
                        <category-badge categoryId=${categoryId}></category-badge>
                        <div class='price-info'>
                          <span class='price-percent'>${percent} %</span>
                          <span class='price-price'>${price.toLocaleString()}</span>
                        </div>
                      </div>
                  `
                  )
                  .join('')}
              </div>`
        }
          </div>
      </div>
    `);
  };
}

customElements.define('main-chart', MainChart);
export default customElements.get('main-chart');
