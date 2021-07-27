import { prevArrow, nextArrow, fileText, calender, chart } from '../icons';
import headerController from './controller';
import observer from '@/common/utils/observer';

import './style.css';

class Header extends HTMLElement {
  constructor() {
    super();
    this.controller = headerController;
    this.observer = observer;
    this.currentDate = this.controller.getCurrentDate();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentYear = this.currentDate.getFullYear();
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      'currentDate-changed',
      this,
      this.handleDateChanged
    );
  }

  handleDateChanged = (data) => {
    this.currentMonth = data.getMonth() + 1;
    this.currentYear = data.getFullYear();
    this.render();
  };

  addEvents = () => {
    const $prevBtn = this.querySelector('#prev-button');
    $prevBtn.addEventListener('click', this.controller.handlePrevBtnClick);

    const $nextBtn = this.querySelector('#next-button');
    $nextBtn.addEventListener('click', this.controller.handleNextBtnClick);
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
          <span id='current-year'>${this.currentYear}</span>
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
