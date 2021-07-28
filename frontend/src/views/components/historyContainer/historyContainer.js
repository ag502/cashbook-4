// eslint-disable-next-line no-unused-vars
import HistoryStatics from '@/views/components/historyStatics/historyStatics'; // this can use history-statics tag in inner html

import './style.css';

class HistoryContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `
      <history-statics></history-statics>
    `;
    this.classList.add('history-controller');
  };
}

customElements.define('history-container', HistoryContainer);

export default customElements.get('history-container');
