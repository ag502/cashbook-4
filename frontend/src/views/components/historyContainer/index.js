import HistoryPanel from './historyPanel'; // this can use history-statics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatics from './historyStatics';

import historyContainerController from './controller';

import './style.css';

class HistoryContainer extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.controller.init();
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(
      /*html*/ `
      <div class="history-panel-fixer">
        <history-panel></history-panel>
      </div>
      <history-statics></history-statics>
      <history-content></history-content>
    `
    ).addClass('history-controller');
  };
}

customElements.define('history-container', HistoryContainer);

export default customElements.get('history-container');
