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

    const header = new Header();
    const historyContainer = new HistoryContainer();

    this.appendChild(header);
    this.appendChild(historyContainer);
    // content
  }
}

customElements.define('main-page', MainPage);
export default customElements.get('main-page');
