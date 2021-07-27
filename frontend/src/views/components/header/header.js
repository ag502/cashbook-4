import { prevArrow, nextArrow, fileText, calender, chart } from '../icons';
import headerController from './controller';
import observer from '@/common/utils/observer';

import './style.css';

class Header extends HTMLElement {
  constructor() {
    super();
    this.controller = headerController;
    this.observer = observer;
    this.currentMonth = this.controller.getCurrentMonth();
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      'currentDate-changed',
      this,
      this.handleMonthChanged.bind(this)
    );
  }

  handleMonthChanged = (data) => {
    this.currentMonth = data.getMonth() + 1;
    this.render();
  };

  addEvents = () => {
    const $prevBtn = this.querySelector('#prev-button');
    $prevBtn.addEventListener('click', this.controller.handlePrevBtnClick);
  };

  render = () => {
    this.innerHTML = /*html*/ `
      <div class='left'>  
        <a href='#/'>
          <h1>
            우아한 가계부
          </h1> 
        </a>
      </div>

      <div class='center'>
        <button id='prev-button'>${prevArrow}</button>
        <div id='time'>
          <h1 id='current-month'>${this.currentMonth}월</h1>
          <span id='current-year'>2021</span>
        </div>
        <button id='next-button'>${nextArrow}</button>
      </div>

      <div class='right'>
        <button class="active">${fileText}</button>
        <button>${calender}</button>
        <button>${chart}</button>
      </div>
    `;

    this.addEvents();
  };
}

customElements.define('main-header', Header);

export default customElements.get('main-header');
