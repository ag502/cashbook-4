import headerController from '../header/controller';
import calendarController from './controller';
import observer from '@/common/utils/observer';
import {
  appendZero,
  checkUndefined,
  parsingDate,
} from '@/common/utils/functions';
import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class CalendarContent extends HTMLElement {
  constructor() {
    super();
    this.controller = headerController;
    this.calendarController = calendarController;
    this.observer = observer;

    this.curPaymentInfo = [];
    this.currentDate = this.controller.getCurrentDate();
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handlefetchedData
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_CURRENT_DATE,
      this,
      this.handlefetchedData
    );
  }

  handlefetchedData = () => {
    this.curPaymentInfo = this.calendarController.getCurrentPaymentInfo();
    this.render();
  };

  getLastDay = () => {
    const [curYear, curMonth] = [
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    ];

    const prevLast = new Date(curYear, curMonth, 0);
    const thisLast = new Date(curYear, curMonth + 1, 0);
    const [plDate, plDay] = [prevLast.getDate(), prevLast.getDay()];
    const [tlDate, tlDay] = [thisLast.getDate(), thisLast.getDay()];

    return [curYear, appendZero(curMonth + 1), plDate, plDay, tlDate, tlDay];
  };

  composeCalender = () => {
    const [curYear, curMonth, _, plDay, tlDate, tlDay] = this.getLastDay();

    const prevDates = plDay !== 6 ? new Array(plDay + 1).fill('') : [];
    const nextDates = new Array(6 - tlDay).fill('');

    const thisDates = [];
    for (let i = 0; i < tlDate + 1; i++) {
      thisDates.push(`${curYear}${curMonth}${appendZero(i)}`);
    }

    return [...prevDates, ...thisDates.slice(1), ...nextDates];
  };

  paymentInfo = (date) => {
    if (!this.curPaymentInfo[date]) {
      return '';
    }
    const { income, expenditure } = this.curPaymentInfo[date];
    return /*html*/ `
      ${checkUndefined(
        income,
        '',
        `<div class='income'>${income.toLocaleString()}</div>`
      )}
      ${checkUndefined(
        expenditure,
        '',
        `<div class='expenditure'>${expenditure.toLocaleString()}</div>`
      )}
      <div class='total'>${(income + expenditure).toLocaleString()}</div>
    `;
  };

  render = () => {
    const calendarDates = this.composeCalender();
    const today = parsingDate(new Date());
    this.setHTML(/*html*/ `
      ${calendarDates
        .map(
          (date) => /*html*/ `
          <div class='calendar-cell ${today === date ? 'today' : ''}'>
            <div class='date-info'>${this.paymentInfo(date)}</div>
            <div class='calendar-date'>${date.slice(-2)}</div>
          </div>
        `
        )
        .join('')}
    `);

    this.composeCalender();
  };
}

customElements.define('calendar-content', CalendarContent);

export default customElements.get('calendar-content');
