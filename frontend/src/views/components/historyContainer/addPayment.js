import HistoryPanel from './historyPanel'; // this can use history-statistics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatistics from './historyStatistics';
import observer from '@/common/utils/observer';
import historyContainerController from './controller';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class AddPayment extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
  }

  connectedCallback() {
    this.render();
  }

  addEvents = () => {
    const $form = this.querySelector('#add-payment-form');
    const $cancelBtn = this.querySelector('#cancel-btn');

    $form.addEventListener('submit', this.handleSubmit);
    $cancelBtn.addEventListener('click', () => {
      this.observer.notify(notifyTypes.CLOSE_MODAL);
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const $payment = event.currentTarget.querySelector('#payment-input');
    const name = $payment.value;
    const result = await this.controller.addPayment(name);
    if (!result.success) {
      this.displayResultMessage(result.message, result.success);
      return;
    }
    this.displayResultMessage('결제정보를 추가했습니다!', result.success);
  };
  displayResultMessage = (message, success) => {
    const $addForm = this.querySelector('#add-payment-form');
    const $errorText = $addForm.parentNode.querySelector('.error-text');
    $errorText.innerText = message;
    if (success) {
      $errorText.style.color = 'var(--primary1)';
    }
    $errorText.style.display = 'block';
  };
  render = () => {
    this.setHTML(
      /*html*/ ` 
      <form id='add-payment-form'>
        <div class="top">
            <label>
                추가하실 결제수단을 적어주세요.
            </label>
            <input type='text' id='payment-input' placeholder="입력하세요"/>
        </div>
        <span class="error-text"></span>
        <div class='bottom'>
            <div class='left'>
                <button id='cancel-btn' type='button'>취소</button>
            </div>
            <div>
                <button id='submit-btn' type='submit'>등록</button>
            </div>
        </div>
    </form>
    `
    ).addClass('add-payment');

    this.addEvents();
  };
}

customElements.define('add-payment', AddPayment);

export default customElements.get('add-payment');
