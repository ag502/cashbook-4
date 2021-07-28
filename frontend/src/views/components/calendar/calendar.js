import CalendarHeader from './calendarHeader';
import './style.css';

class Calendar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = `<calendar-header></calendar-header>`;
  };
}

customElements.define('cashbook-calendar', Calendar);

export default customElements.get('cashbook-calendar');
