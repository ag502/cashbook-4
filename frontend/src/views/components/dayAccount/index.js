import './style.css';

import Account from './account';
import { parsingDate } from '../../../common/utils/functions';

const getDayString = (dayNumber) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayNumber];
};

class DayAccount extends HTMLElement {
  constructor({ date, accounts }) {
    super();

    this.date = new Date(Number(date));
    this.accounts = accounts;

    this.totalIncome = 0;
    this.totalExpenditure = 0;

    accounts.forEach((account) => {
      if (account.price >= 0) {
        return (this.totalIncome += account.price);
      }
      return (this.totalExpenditure -= account.price);
    });
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
        <div class="info">
            <div class="left">
                <span class="date">
                  ${parsingDate(this.date, 'account')}
                </span>
                <span class="day">
                  ${getDayString(this.date.getDay())}
                </span>
            </div>

            <div class="right">
                ${
                  this.totalIncome > 0
                    ? `<span>수입 ${this.totalIncome.toLocaleString()}</span>`
                    : ``
                }
                ${
                  this.totalExpenditure > 0
                    ? `<span>지출 ${this.totalExpenditure.toLocaleString()}</span>`
                    : ``
                }
                  
                
            </div>
        </div>

        <div id='account-list' class="account-list"></div>
    `);

    const $accountList = this.querySelector('#account-list');
    this.accounts.forEach((accountInfo) => {
      const $account = new Account(accountInfo);
      $accountList.appendChild($account);
    });
  };
}

customElements.define('day-account', DayAccount);

export default customElements.get('day-account');
