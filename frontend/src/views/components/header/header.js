import { prevArrow, nextArrow, fileText, calender, chart } from '../icons';
import './style.css';

class Header extends HTMLElement {
  constructor() {
    super();
    // TODO: setting observer & controller
  }
  connectedCallback() {
    this.render();
  }

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
          <h1 id='current-month'>7월</h1>
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
  };
}

customElements.define('main-header', Header);

export default customElements.get('main-header');
