import './style.css';

import Record from './record';

const getDayString = (dayNumber) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayNumber];
};

class DayRecord extends HTMLElement {
  constructor({ date, records }) {
    super();

    this.date = new Date(Number(date));
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
                  ${this.date.getMonth() + 1}월 ${this.date.getDate()}일
                </span>
                <span class="day">
                  ${getDayString(this.date.getDay())}
                </span>
            </div>

            <div class="right">
                ${
                  this.totalIncome > 0
                    ? `<span>수입 ${this.totalIncome}</span>`
                    : ``
                }
                ${
                  this.totalExpenditure > 0
                    ? `<span>지출 ${this.totalExpenditure}</span>`
                    : ``
                }
                  
                
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
