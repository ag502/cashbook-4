import HistoryPanel from './historyPanel'; // this can use history-statistics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatistics from './historyStatistics';
import observer from '@/common/utils/observer';
import historyContainerController from './controller';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class ResultView extends HTMLElement {
  constructor({ success, message }) {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    this.message = message;
    this.success = success;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // request new fetched data
    if (this.sucess) {
      this.observer.notify(notifyTypes.FETCHED_DATA);
    }
  }

  addEvents = () => {
    const $closeBtn = this.querySelector('#close-btn');
    $closeBtn.addEventListener('click', () => {
      this.observer.notify(notifyTypes.CLOSE_MODAL);
    });
  };

  handleSubmit = async (event) => {};

  render = () => {
    this.setHTML(
      /*html*/ ` 
      <h1>${this.message}</h1>
      <button id='close-btn'>확인</button>
    `
    ).addClass('result-view');

    this.addEvents();
  };
}

customElements.define('result-view', ResultView);

export default customElements.get('result-view');
