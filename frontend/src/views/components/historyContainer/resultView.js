import HistoryPanel from './historyPanel'; // this can use history-statistics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatistics from './historyStatistics';
import observer from '@/common/utils/observer';
import historyContainerController from './controller';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class ResultView extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  addEvents = () => {};

  handleSubmit = async (event) => {};

  render = () => {
    this.setHTML(
      /*html*/ ` 
      dsadasdasds
    `
    ).addClass('result-view');

    this.addEvents();
  };
}

customElements.define('result-view', ResultView);

export default customElements.get('result-view');
