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

  submitHandler = async (event) => {
    event.preventDefault();
    const $form = event.currentTarget;
    this.toggleSubmitBtnEffect();
    const $nickname = $form.querySelector('#nickname');
    const $password = $form.querySelector('#password');
    if (!this.validator($nickname) || !this.validator($password)) {
      this.toggleSubmitBtnEffect();
      return;
    }
    const nickname = $nickname.value;
    const password = $password.value;
    const result = await this.controller.handleLogin({ nickname, password });
    if (!result.success) {
      this.toggleSubmitBtnEffect();
      return this.handleLoginFail(result.message);
    }
  };

  handleLoginFail = (message) => {
    const $loginBtn = this.querySelector('.submit-input button');
    const $errorText = $loginBtn.parentNode.querySelector('.error-text');
    $errorText.innerText = message;
    $errorText.style.display = 'block';
  };

  toggleSubmitBtnEffect = () => {
    const $loginBtn = this.querySelector('.submit-input button');
    $loginBtn.toggleClass('active');
  };

  validator = ($element) => {
    const $errorText = $element.parentNode.querySelector('.error-text');
    if (!$element.value) {
      // not valid
      $element.style.borderColor = 'var(--error)';
      $errorText.style.display = 'block';
      return false;
    }

    $element.style.borderColor = 'var(--line)';
    $errorText.style.display = 'none';
    return true;
  };

  handleRegisterBtnClick = () => {
    this.controller.showRegisterView();
  };

  addEvents = () => {
    const $loginForm = this.querySelector('#login-form');
    $loginForm.addEventListener('submit', this.submitHandler);

    const $registerBtn = this.querySelector('#register-btn');
    $registerBtn.addEventListener('click', this.handleRegisterBtnClick);

    const $nicknameInput = this.querySelector('#nickname');
    $nicknameInput.addEventListener('keyup', ({ currentTarget }) => {
      this.validator(currentTarget);
    });

    const $passwordInput = this.querySelector('#password');
    $passwordInput.addEventListener('keyup', ({ currentTarget }) => {
      this.validator(currentTarget);
    });
  };

  render = () => {
    this.setHTML(
      /*html*/ `
      <form id="login-form">
        <h1>
          로그인
        </h1>
        <div class="input-wrapper nickname-input">
          <label for="nickname">Nickname</label>
          <input type="text" id="nickname" autocomplete="off"
          placeholder="nickname"/>
          <span class="error-text">닉네임을 입력해 주세요!</span>
        </div>
        <div class="input-wrapper password-input">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" 
            autocomplete="off" placeholder="뒤에 누가 있는지 확인하세요 :)"/>
            <span class="error-text">비밀번호를 입력해 주세요!</span>
        </div>
        <div class="input-wrapper submit-input">
          <button type="submit">로그인</button>
          <span class="error-text">로그인에 실패하였습니다!</span>
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
