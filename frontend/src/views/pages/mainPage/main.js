import Header from '@/views/components/header/header.js';

class MainPage extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'block';
    // TODO: setting observer & controller
  }

  connectedCallback() {
    // TODO : observer event subscrib & controller init

    const header = new Header();
    this.appendChild(header);
    // content
  }
}

customElements.define('main-page', MainPage);
export default customElements.get('main-page');
