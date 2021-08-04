import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import { check, chevronDown, iconButton, verticalMore } from '../icons';
import historyContainerController from './controller';
import { parsingDate } from '@/common/utils/functions';

const categories = [
  '월급',
  '용돈',
  '기타수입',
  '생활',
  '식비',
  '교통',
  '쇼핑/뷰티',
  '의료/건강',
  '문화/여가',
  '미분류',
];

class HistoryPanel extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    this.payments = this.controller.getPayments();
    this.selectedPaymentId = null;
    this.dateString = parsingDate(new Date());
    this.inputInfo = {
      time: this.dateString,
      categoryId: '',
      context: '',
      paymentId: '',
      price: '',
    };
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.CLICK_ACCOUNT,
      this,
      this.handleAccountClick
    );
    this.observer.subscribe(notifyTypes.INIT_USER, this, this.handleInitUser);

    this.render();
  }

  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.CLICK_ACCOUNT, this);
    this.observer.unsubscribe(notifyTypes.INIT_USER, this);
  }

  handleAccountClick = (accountInfo) => {
    const { date, category, content, paymentMethod, price } = accountInfo;
    this.dateString = parsingDate(date);
    this.category = category;
    this.content = content;
    this.paymentMethod = paymentMethod;
    this.price = price;

    this.render();
  };

  handleInitUser = () => {
    this.payments = this.controller.getPayments();
    this.render();
  };

  toggleCategoryDropdown = () => {
    const $categoryDropdown = this.querySelector('.dropdown.category');
    const curentDisplay = $categoryDropdown.style.display;
    if (!curentDisplay || curentDisplay === 'none') {
      return ($categoryDropdown.style.display = 'flex');
    }
    return ($categoryDropdown.style.display = 'none');
  };

  togglePaymentDropdown = () => {
    const $paymentDropdown = this.querySelector('.dropdown.payment');
    const curentDisplay = $paymentDropdown.style.display;
    if (!curentDisplay || curentDisplay === 'none') {
      return ($paymentDropdown.style.display = 'flex');
    }
    return ($paymentDropdown.style.display = 'none');
  };

  selectCategory = (id) => {
    this.toggleCategoryDropdown();
    const $selectCategoryBtn = this.querySelector('#select-category-btn');
    $selectCategoryBtn.innerHTML = `${categories[id]} ${chevronDown}`;
    $selectCategoryBtn.classList.add('selected');

    this.inputInfo = { ...this.inputInfo, categoryId: id };
  };

  selectPayment = (id) => {
    this.togglePaymentDropdown();
    const $selectPaymentBtn = this.querySelector('#select-payment-btn');
    this.selectedPaymentId = Number(id);
    const payment = this.payments.find((p) => p.id === this.selectedPaymentId);
    $selectPaymentBtn.innerHTML = `${payment.name} ${chevronDown}`;
    $selectPaymentBtn.classList.add('selected');

    this.inputInfo = { ...this.inputInfo, paymentId: id };
  };

  handleAddPayment = () => {
    this.observer.notify(notifyTypes.CLICK_ADD_PAYMENT);
  };

  handleModifyPayment = (id) => {
    this.observer.notify(notifyTypes.CLICK_EDIT_PAYMENT, Number(id));
  };

  checkCanSubmit = () => {
    return !Object.keys(this.inputInfo).some(
      (field) => this.inputInfo[field] === ''
    );
  };

  addEvents = () => {
    const $selectCategoryBtn = this.querySelector('#select-category-btn');
    $selectCategoryBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.toggleCategoryDropdown();
    });

    const $selectPaymentBtn = this.querySelector('#select-payment-btn');
    $selectPaymentBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.togglePaymentDropdown();
    });

    const $categoryDropdown = this.querySelector('.dropdown.category');
    $categoryDropdown.addEventListener('click', ({ target }) => {
      this.selectCategory(target.dataset.id);
    });

    const $paymentDropdown = this.querySelector('.dropdown.payment');
    $paymentDropdown.addEventListener('click', ({ target }) => {
      if (target.id === 'add-payment') {
        this.handleAddPayment();
        return;
      } else if (target.id === 'edit') {
        this.handleModifyPayment(target.dataset.id);
        return;
      }
      this.selectPayment(target.dataset.id);
    });

    this.addEventListener('input', ({ target }) => {
      if (target.tagName === 'INPUT') {
        this.inputInfo = { ...this.inputInfo, [target.name]: target.value };
      }
    });

    const $checkbox = this.querySelector('.check-box');
    $checkbox.addEventListener('click', async () => {
      if (!this.checkCanSubmit()) {
        console.log('no');
      }
      await this.controller.addAccount(this.inputInfo);
    });
  };

  render = () => {
    this.setHTML(/*html*/ `
        <form>
            <div class="history-input-box">
                <label>일자</label>
                <input type="text" name="time" value='${this.dateString}'/>
            </div>
                

            <div class="history-input-box">
                <label>분류</label>
                <button id="select-category-btn">선택하세요 ${chevronDown}</button>
                <div class="dropdown category">
                  ${categories
                    .map((category, index) => {
                      return /*html*/ `
                        <div class="category-item" data-id=${index + 1}>
                          <div class='content'>
                            ${category}
                          </div>
                        </div>
                      `;
                    })
                    .join('')}
                </div>
            </div>


            <div class="history-input-box context">
                <label>내용</label>
                <input 
                  type="text" 
                  name="context" 
                  placeholder="입력하세요" 
                  ${this.content ? `value=${this.content}` : ''}
                />
            </div>


            <div class="history-input-box">
                <label>결제수단</label>
                <button id="select-payment-btn">선택하세요 ${chevronDown}</button>
                <div class="dropdown payment">
                      ${this.payments
                        .map((payment) => {
                          /*html*/
                          return `
                              <div class='payment-item' data-id=${payment.id}>
                                  <div class='content'>
                                    ${payment.name} 
                                  </div>
                                  <div class='edit' id='edit' data-id=${payment.id}>
                                    ${verticalMore}
                                  </div>
                              </div>
                            `;
                        })
                        .join('')}
                        <div id="add-payment">
                          <div class="content">
                            추가하기
                          </div>
                        </div>
                    </div>
            </div>


            <div class="history-input-box cash">
                <label>금액</label>
                <div class="cost-content">
                    ${iconButton}
                    <input 
                      type="number" 
                      placholder="입력하세요" 
                      name="price" 
                      ${this.content ? `value=${this.price}` : ''}
                    />
                      &nbsp;원
                </div>
            </div>

            <div class="check-box">
                ${check}
            </div>
        </form> 
    `);

    this.addEvents();
  };
}

customElements.define('history-panel', HistoryPanel);

export default customElements.get('history-panel');
