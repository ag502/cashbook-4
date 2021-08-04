import loginController from './controller';

class RegisterContent extends HTMLElement {
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
    const $nickname = $form.querySelector('#nickname');
    const $password = $form.querySelector('#password');
    const $confirmPassword = $form.querySelector('#confirm-password');
    const $loginBtn = $form.querySelector('#login-btn');
    if (
      !this.validator($nickname) ||
      !this.validator($password) ||
      !this.validator($confirmPassword)
    ) {
      this.toggleSubmitBtnEffect();
      return;
    }
    const nickname = $nickname.value;
    const password = $password.value;
    const confirmPassword = $confirmPassword.value;
    if (password !== confirmPassword) {
      return this.popupErrorText(
        $confirmPassword,
        '비밀번호가 일치하지 않습니다!'
      );
    }
    const result = await this.controller.handleRegister({ nickname, password });
    if (result.success) {
      this.displayResultMessage('회원가입에 성공하였습니다!', true);
      return setTimeout(() => {
        this.controller.showLoginView();
      }, 1200);
    }
    this.displayResultMessage(result.message, false);
  };

  displayResultMessage = (message, success) => {
    const $loginBtn = this.querySelector('.submit-input button');
    const $errorText = $loginBtn.parentNode.querySelector('.error-text');
    $errorText.innerText = message;
    if (success) {
      $errorText.style.color = 'var(--primary1)';
    }
    $errorText.style.display = 'block';
  };

  popupErrorText = ($element, text) => {
    const $errorText = $element.parentNode.querySelector('.error-text');
    $element.style.borderColor = 'var(--error)';
    $errorText.style.display = 'block';
    $errorText.innerTEXT = text;
    return false;
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

  handleLoginBtnClick = () => {
    this.controller.showLoginView();
  };

  addEvents = () => {
    const $registerForm = this.querySelector('#register-form');
    $registerForm.addEventListener('submit', this.submitHandler);

    const $loginBtn = this.querySelector('#login-btn');
    $loginBtn.addEventListener('click', this.handleLoginBtnClick);

    const $nicknameInput = this.querySelector('#nickname');
    $nicknameInput.addEventListener('keyup', ({ currentTarget }) => {
      this.validator(currentTarget);
    });

    const $passwordInput = this.querySelector('#password');
    $passwordInput.addEventListener('keyup', ({ currentTarget }) => {
      this.validator(currentTarget);
    });

    const $confirmPassword = this.querySelector('#confirm-password');
    $confirmPassword.addEventListener('keyup', ({ currentTarget }) => {
      this.validator(currentTarget);
    });
  };

  render = () => {
    this.setHTML(
      /*html*/ `
      <form id="register-form">
        <h1>
          회원가입
        </h1>
        <div class="input-wrapper nickname-input">
          <label for="nickname">nickname</label>
          <input type="nickname" id="nickname" autocomplete="off"
          placeholder="nickname" />
          <span class="error-text">닉네임은 6자 이상어야 합니다!</span>
        </div>
        <div class="input-wrapper password-input">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" 
            autocomplete="off" placeholder="뒤에 누가 있는지 확인하세요 :)"/>
          <span class="error-text">비밀번호는 8자 이상이어야 합니다!</span>
        </div>
        <div class="input-wrapper confirm-password-input">
          <label for="confirm-password">Password</label>
          <input type="password" id="confirm-password" name="confirm-password" 
            autocomplete="off" placeholder="비밀번호를 한번 더 입력하세요!"/>
          <span class="error-text">위 비밀번호와 같게 입력 해 주세요</span>
        </div>
        <div class="input-wrapper submit-input">
          <button type="submit">회원가입</button>
          <span class="error-text">회원가입에 실패하였습니다.</span>
        </div>
      </form>
      
      <div class="login">
        <span>계정을 만드셨나요? <strong id="login-btn">로그인</strong></span>
      </div>
    `
    ).addClass('auth-content');

    this.addEvents();
  };
}

customElements.define('register-content', RegisterContent);

export default customElements.get('register-content');
