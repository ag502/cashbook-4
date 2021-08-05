import notifyTypes from '@/common/utils/notifyTypes';
import observer from '@/common/utils/observer';
import './style.css';

class Modal extends HTMLElement {
  constructor({ $contentElement, toggleModal = true }) {
    super();
    this.$contentElement = $contentElement;
    this.toggleModal = toggleModal;
    this.observer = observer;
  }

  connectedCallback() {
    this.observer.subscribe(notifyTypes.CLOSE_MODAL, this, this.closeModal);
    this.render();
  }

  addEvents = () => {
    this.addEventListener('click', ({ target }) => {
      if (target === this) {
        this.handleModalClick();
      }
    });
  };

  handleModalClick = () => {
    if (this.toggleModal) {
      this.closeModal();
    }
  };
  closeModal = () => {
    this.remove();
  };

  render = () => {
    this.setHTML(/*html*/ ``);

    this.appendChild(this.$contentElement);

    this.addEvents();
  };
}

customElements.define('modal-view', Modal);

export default customElements.get('modal-view');
