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
    const email = $form.querySelector('#email').value;
    const password = $form.querySelector('#password').value;
    const confirmPasssword = $form.querySelector('#confirm-password').value;

    if (password !== confirmPasssword) {
      return; // TODO: 비밀번호가 같지 않습니다.
    }
    const result = await this.controller.handleRegister({ email, password });
    if (result) {
      // TODO: 회원가입 성공 ()
      this.controller.showLoginView();
    }
  };

  handleLoginBtnClick = () => {
    this.controller.showLoginView();
  };

  addEvents = () => {
    const $registerForm = this.querySelector('#register-form');
    $registerForm.addEventListener('submit', this.submitHandler);

    const $loginBtn = this.querySelector('#login-btn');
    $loginBtn.addEventListener('click', this.handleLoginBtnClick);
  };

  render = () => {
    this.setHTML(
      /*html*/ `
      <form id="register-form">
        <h1>
          회원가입
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
        <div class="input-wrapper confirm-password-input">
          <label for="confirm-password">Password</label>
          <input type="password" id="confirm-password" name="confirm-password" 
            autocomplete="off" placeholder="비밀번호를 한번 더 입력하세요!"/>
        </div>
        <div class="input-wrapper submit-input">
          <button type="submit">회원가입</button>
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
