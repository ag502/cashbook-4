import historyContainerController from './controller';

class HistoryContent extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `
      
    `;
  };
}

customElements.define('history-content', HistoryContent);

export default customElements.get('history-content');
