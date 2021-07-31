import Modal from '@/views/components/modal';
import LoginContent from './loginContent';

class Login extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    const $loginContainer = new Modal({
      $contentElement: new LoginContent(),
    });

    this.appendChild($loginContainer);
  };
}

customElements.define('login-view', Login);

export default customElements.get('login-view');
