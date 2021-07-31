import loginController from './controller';
import { github } from '../icons';

class LoginContent extends HTMLElement {
  constructor() {
    super();
    this.controller = loginController;
  }

  connectedCallback() {
    this.render();
  }

  submitHandler = (event) => {
    event.preventDefault();
    const $form = event.currentTarget;
    const email = $form.querySelector('#email').value;
    const password = $form.querySelector('#password').value;
    this.controller.handleLogin({ email, password });
  };

  handleRegisterBtnClick = () => {
    this.controller.showRegisterView();
  };

  addEvents = () => {
    const $loginForm = this.querySelector('#login-form');
    $loginForm.addEventListener('submit', this.submitHandler);

    const $registerBtn = this.querySelector('#register-btn');
    $registerBtn.addEventListener('click', this.handleRegisterBtnClick);
  };

  render = () => {
    this.setHTML(
      /*html*/ `
      <form id="login-form">
        <h1>
          로그인
        </h1>
        <div class="input-wrapper email-input">
          <label for="email">Email</label>
          <input type="email" id="email" autocomplete="off"
          placeholder="imEmail@email.com" />
        </div>
        <div class="input-wrapper password-input">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" 
            autocomplete="off" placeholder="뒤에 누가 있는지 확인하세요 :)"/>
        </div>
        <div class="input-wrapper submit-input">
          <button type="submit">로그인</button>
        </div>
      </form>
      <div class="social-logins">
        <button>
          ${github} Github으로 로그인하기!
        </button>
      </div>
      <div class="register">
        <span>혹시 계정이 없으신가요? <strong id="register-btn">회원가입</strong></span>
      </div>
    `
    ).addClass('auth-content');

    this.addEvents();
  };
}

customElements.define('login-content', LoginContent);

export default customElements.get('login-content');
