import CalendarHeader from './calendarHeader';
import $ from '@/common/utils/domController';
import headerController from '../header/controller';
import observer from '@/common/utils/observer';
import './style.css';

class Calendar extends HTMLElement {
  constructor() {
    super('test');
    this.controller = headerController;
    this.observer = observer;
    this.currentDate = this.controller.getCurrentDate();
  }

  connectedCallback() {
    this.render();
    observer.subscribe('currentDate-changed', this, this.render);
  }

  getLastDay = () => {
    const [curYear, curMonth] = [
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    ];

    const prevLast = new Date(curYear, curMonth, 0);
    const thisLast = new Date(curYear, curMonth + 1, 0);
    const [plDate, plDay] = [prevLast.getDate(), prevLast.getDay()];
    const [tlDate, tlDay] = [thisLast.getDate(), thisLast.getDay()];

    return [plDate, plDay, tlDate, tlDay];
  };

  composeCalender = () => {
    const [_, plDay, tlDate, tlDay] = this.getLastDay();

    const prevDates = plDay !== 6 ? new Array(plDay + 1).fill('') : [];
    const nextDates = new Array(6 - tlDay).fill('');
    const thisDates = [...Array(tlDate + 1).keys()].slice(1);

    return [...prevDates, ...thisDates, ...nextDates];
  };

  render = () => {
    const calendarDates = this.composeCalender();
    this.innerHTML = /*html*/ `
      ${calendarDates
        .map(
          (date) => /*html*/ `
          <div class='calendar-cell'>
            <div class='cash-info'>TEST</div>
            <div class='calendar-date'>${date}</div>
          </div>
        `
        )
        .join('')}
    `;

    this.composeCalender();
  };
}

customElements.define('cashbook-calendar', Calendar);

export default customElements.get('cashbook-calendar');
