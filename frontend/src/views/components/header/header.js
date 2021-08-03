import {
  prevArrow,
  nextArrow,
  fileText,
  calender,
  chart,
  logoutButton,
} from '../icons';
import headerController from './controller';
import observer from '@/common/utils/observer';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

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
      notifyTypes.CHANGED_CURRENT_DATE,
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
    $prevBtn.addEventListener('click', async () => {
      await this.controller.handlePrevBtnClick();
    });

    const $nextBtn = this.querySelector('#next-button');
    $nextBtn.addEventListener('click', async () => {
      this.controller.handleNextBtnClick();
    });

    const $fileTextBtn = this.querySelector('#file-text-btn');
    $fileTextBtn.addEventListener('click', () => {
      location.hash = '';
    });
    const $calenderBtn = this.querySelector('#calender-btn');
    $calenderBtn.addEventListener('click', () => {
      location.hash = '#/calender';
    });
    const $chartBtn = this.querySelector('#chart-btn');
    $chartBtn.addEventListener('click', () => {
      location.hash = '#/chart';
    });
    const $logoutBtn = this.querySelector('#logout-btn');
    $logoutBtn.addEventListener('click', () => {
      this.observer.notify(notifyTypes.CLICK_LOGOUT);
    });
  };

  render = () => {
    this.setHTML(/*html*/ `
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
        <button class='active' id='file-text-btn'>${fileText}</button>
        <button id='calender-btn'>${calender}</button>
        <button id='chart-btn'>${chart}</button>
        <button id='logout-btn'>${logoutButton}</button>
      </div>
    `);

    this.addEvents();
  };
}

customElements.define('main-header', Header);

export default customElements.get('main-header');
