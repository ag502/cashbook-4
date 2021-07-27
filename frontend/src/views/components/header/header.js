class Header extends HTMLElement {
  constructor() {
    super();
    // TODO: setting observer & controller
  }
  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = `<header>TEMP</header> `;
  };
}

customElements.define('main-header', Header);

export default customElements.get('main-header');
