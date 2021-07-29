import Header from '@/views/components/header/header';
import observer from '../../../common/utils/observer';
import Calendar from '@/views/components/calendar/index.js';

class MainPage extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'block';
    // TODO: setting observer & controller
  }

  connectedCallback() {
    // TODO : observer event subscrib & controller init
    this.innerHTML = '';

    const header = new Header();
    const calendar = new Calendar();
    this.appendChild(header);
    this.appendChild(calendar);
  }
}

customElements.define('calender-page', MainPage);
export default customElements.get('calender-page');
