class LoginContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
        <div>
            나는 로그인
        </div>
    `);
  };
}

customElements.define('login-content', LoginContent);

export default customElements.get('login-content');
