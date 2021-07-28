import './style.css';

import Record from './record';

class DayRecord extends HTMLElement {
  constructor({ records }) {
    super();
    this.records = records;

    this.totalIncome = 0;
    this.totalExpenditure = 0;

    records.forEach((record) => {
      if (record.price >= 0) {
        return (this.totalIncome += record.price);
      }
      return (this.totalExpenditure -= record.price);
    });
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `
        <div class="info">
            <div class="left">
                <span class="date">
                    7월 15일
                </span>
                <span class="day">
                    목
                </span>
            </div>

            <div class="right">
                <span>수입 ${this.totalIncome}</span>
                <span>지출 ${this.totalExpenditure}</span>
            </div>
        </div>

        <div id='record-list' class="record-list"></div>
    `;

    const $recordList = this.querySelector('#record-list');
    this.records.forEach((recordInfo) => {
      const record = new Record(recordInfo);
      $recordList.appendChild(record);
    });
  };
}

customElements.define('day-record', DayRecord);

export default customElements.get('day-record');
