import Header from '@/views/components/header/header';
import HistoryContainer from '@/views/components/historyContainer';
import Calendar from '@/views/components/calendar/index.js';

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
    // const calendar = new Calendar();

    this.appendChild(header);
    this.appendChild(historyContainer);
    // this.appendChild(calendar);
  }
}

customElements.define('main-page', MainPage);
export default customElements.get('main-page');
