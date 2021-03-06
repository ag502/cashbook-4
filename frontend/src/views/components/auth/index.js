import Modal from '@/views/components/modal';
import observer from '@/common/utils/observer';

import LoginContent from './loginContent';
import RegisterContent from './registerContent';

import './style.css';
import controller from './controller';
import notifyTypes from '@/common/utils/notifyTypes';

class Auth extends HTMLElement {
  constructor() {
    super();
    this.observer = observer;
    this.controller = controller;
    this.$loginContent = new LoginContent();
    this.$registerContent = new RegisterContent();
    this.$currentContent = this.$loginContent;
    this.contentTypes = this.controller.getContentTypes();
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.CHANGED_LOGIN_CONTENT,
      this,
      this.handleChangedContent
    );
    this.observer.subscribe(notifyTypes.INIT_USER, this, this.handleInitUser);
  }

  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.CHANGED_LOGIN_CONTENT, this);
    this.observer.unsubscribe(notifyTypes.INIT_USER, this);
  }

  handleInitUser = (isLogin) => {
    if (isLogin) {
      this.remove();
    }
  };

  handleChangedContent = (type) => {
    if (type === this.contentTypes.REGISTER) {
      this.$currentContent = this.$registerContent;
    } else {
      this.$currentContent = this.$loginContent;
    }

    this.render();
  };

  render = () => {
    this.setHTML(``);
    const $loginContainer = new Modal({
      $contentElement: this.$currentContent,
      toggleModal: false,
    });

    this.appendChild($loginContainer);
  };
}

customElements.define('auth-view', Auth);

export default customElements.get('auth-view');
