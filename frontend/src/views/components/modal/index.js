import './style.css';

class Modal extends HTMLElement {
  constructor({ $contentElement }) {
    super();
    this.$contentElement = $contentElement;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ ``);

    this.appendChild(this.$contentElement);
  };
}

customElements.define('modal-view', Modal);

export default customElements.get('modal-view');
