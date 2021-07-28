import Header from '@/views/components/header/header.js';
import Calendar from '@/views/components/calendar';

class MainPage extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'block';
    // TODO: setting observer & controller
  }

  connectedCallback() {
    // TODO : observer event subscrib & controller init

    const header = new Header();
    const calendar = new Calendar();
    this.appendChild(header);
    this.appendChild(calendar);
  }
}

customElements.define('main-page', MainPage);
export default customElements.get('main-page');
