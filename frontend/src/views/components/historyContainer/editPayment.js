import HistoryPanel from './historyPanel'; // this can use history-statistics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatistics from './historyStatistics';
import observer from '@/common/utils/observer';
import historyContainerController from './controller';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class EditPayment extends HTMLElement {
  constructor({ paymentId }) {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    const payments = this.controller.getPayments();
    this.payment = payments.find((p) => p.id === paymentId);
  }

  connectedCallback() {
    this.render();
  }

  addEvents = () => {
    const $form = this.querySelector('#add-payment-form');
    const $deleteBtn = this.querySelector('#delete-btn');

    $form.addEventListener('submit', this.handleSubmit);
    $deleteBtn.addEventListener('click', this.handleDelete);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const $payment = event.currentTarget.querySelector('#payment-input');
    const name = $payment.value;
    const result = await this.controller.updatePayment(name);
    if (!result.success) {
      this.displayResultMessage(result.message, result.success);
      return;
    }
    this.displayResultMessage('결제정보를 수정했습니다!', result.success);
  };

  handleDelete = async () => {
    const result = await this.controller.deletePayment(this.payment.id);
    if (!result.success) {
      this.displayResultMessage(result.message, result.success);
      return;
    }

    this.displayResultMessage('결제정보가 삭제되었습니다!', result.success);
    setTimeout(() => {
      this.observer.notify(notifyTypes.CLOSE_MODAL);
    }, 1200);
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
                새 결제수단을 입력하세요.
            </label>
            <input type='text' id='payment-input' placeholder='${this.payment.name}'/>
        </div>
        <span class="error-text"></span>
        <div class='bottom'>
            <div class='left'>
                <button id='delete-btn' type='button'>삭제</button>
            </div>
            <div>
                <button id='submit-btn' type='submit'>수정</button>
            </div>
        </div>
    </form>
    `
    ).addClass('edit-payment');

    this.addEvents();
  };
}

customElements.define('edit-payment', EditPayment);

export default customElements.get('edit-payment');
