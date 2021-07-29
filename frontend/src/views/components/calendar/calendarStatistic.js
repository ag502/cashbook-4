import calendarController from './controller';
import observer from '@/common/utils/observer';
import { checkUndefined } from '@/common/utils/functions';
import notifyTypes from '@/common/utils/notifyTypes';

class CalendarStatistic extends HTMLElement {
  constructor() {
    super();
    this.calendarController = calendarController;
    this.observer = observer;

    this.currentPaymentInfo = {};
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleFetchdata
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_CURRENT_DATE,
      this,
      this.handleFetchdata
    );
    this.render();
  }

  handleFetchdata = () => {
    this.currentPaymentInfo = calendarController.getCurrentPaymentInfo();
    this.render();
  };

  render = () => {
    const { totalIncome, totalExpenditure } = this.currentPaymentInfo;
    this.setHTML(/*html*/ `
      <div class='left'>
        <div class='total-income'>
          <span>총 수입</span>
          <span>${checkUndefined(totalIncome, 0).toLocaleString()}</span>
        </div>
        <div class='total-expenditure'>
          <span>총 지출</span>
          <span>${checkUndefined(-totalExpenditure, 0).toLocaleString()}</span>
        </div>
      </div>
      <div class='right'>
        <span>총계</span>
        <span>${checkUndefined(
          totalIncome + totalExpenditure,
          0
        ).toLocaleString()}</span>
      </div>
    `);
  };
}

customElements.define('calendar-statistic', CalendarStatistic);
export default customElements.get('calendar-statistic');
