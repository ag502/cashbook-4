// eslint-disable-next-line no-unused-vars
import HistoryPanel from './historyPanel'; // this can use history-statics tag in inner html
// eslint-disable-next-line no-unused-vars
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
// eslint-disable-next-line no-unused-vars
import historyStatics from './historyStatics';

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
      <div class="history-panel-fixer">
        <history-panel></history-panel>
      </div>
      <history-statics></history-statics>
      <history-content></history-content>
    `;
    this.classList.add('history-container');
  };
}

customElements.define('history-container', HistoryContainer);

export default customElements.get('history-container');
