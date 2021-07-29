import CalendarHeader from './calendarHeader';
import CalendarContent from './calendarContent';
import CalendarStatistic from './calendarStatistic';

class Calendar extends HTMLElement {
  connectedCallback() {
    this.addElement(new CalendarHeader())
      .addElement(new CalendarContent())
      .addElement(new CalendarStatistic());
  }
}

customElements.define('calendar-container', Calendar);

export default customElements.get('calendar-container');
