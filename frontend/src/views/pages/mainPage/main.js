import Header from '@/views/components/header/header';
import HistoryContainer from '@/views/components/historyContainer';

class MainPage extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'block';
    // TODO: setting observer & controller
  }

  connectedCallback() {
    // TODO : observer event subscrib & controller init
    const path = window.location.pathname;
    const header = new Header(path);
    const historyContainer = new HistoryContainer();
    this.setHTML('').addElement(header).addElement(historyContainer);
  }
}

customElements.define('main-page', MainPage);
export default customElements.get('main-page');
