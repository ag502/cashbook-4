import CalendarHeader from './calendarHeader';
import CalendarContent from './calendarContent';
import CalendarStatistic from './calendarStatistic';

class Calendar extends HTMLElement {
  connectedCallback() {
    this.setHTML(/*html*/ `
      <div class='fixer'></div>
      <div class='calendar-wrapper'>
        <calendar-header></calendar-header>
        <calendar-content></calendar-content>
        <calendar-statistic></calendar-statistic>
      </div>
    `);
  }
}

customElements.define('calendar-container', Calendar);

export default customElements.get('calendar-container');
