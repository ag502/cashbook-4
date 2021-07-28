import calendarController from './controller';
import observer from '@/common/utils/observer';

class CalendarStatistic extends HTMLElement {
  constructor() {
    super();
    this.calendarController = calendarController;
    this.observer = observer;

    this.currentPaymentInfo = [];
  }

  connectedCallback() {
    this.observer.subscribe('fetch-data', this, this.handleFetchdata);
    this.render();
  }

  handleFetchdata = () => {
    this.currentPaymentInfo = calendarController.getCurrentPaymentInfo();
    this.render();
  };

  render = () => {
    this.setHTML(/*html*/ `
      <div class='left'>
        <div class='total-income'>
          <span>총 수입</span>
          <span>1822480</span>
        </div>
        <div class='total-expenditure'>
          <span>총 지출</span>
          <span>834640</span>
        </div>
      </div>
      <div class='right'>
        <span>총계</span>
        <span>987840</span>
      </div>
    `);
  };
}

customElements.define('calendar-statistic', CalendarStatistic);
export default customElements.get('calendar-statistic');
