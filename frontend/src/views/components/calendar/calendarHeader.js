const dates = ['일', '월', '화', '수', '목', '금', '토'];

class CalendarHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
      <div class='calendar-header'>
        ${dates
          .map((date) => `<div class='calendar-day'>${date}</div>`)
          .join('')}
      </div>
    `);
  };
}

customElements.define('calendar-header', CalendarHeader);

export default customElements.get('calendar-header');
