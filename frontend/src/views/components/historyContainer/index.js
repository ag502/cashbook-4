// eslint-disable-next-line no-unused-vars
import HistoryStatics from './historyStatics'; // this can use history-statics tag in inner html
// eslint-disable-next-line no-unused-vars
import HistoryContent from './historyContent'; // this can use history-content tag in inner html

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
      <div class="history-statics-fixer">
        <history-statics></history-statics>
      </div>
      <history-content></history-content>
    `;
    this.classList.add('history-container');
  };
}

customElements.define('history-container', HistoryContainer);

export default customElements.get('history-container');
