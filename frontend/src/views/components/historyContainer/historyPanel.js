import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import { check, chevronDown, iconButton, verticalMore, pencil } from '../icons';
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

const initalInputInfo = {
  date: parsingDate(new Date(), 'inputCalendar'),
  categoryId: '',
  content: '',
  paymentId: '',
  price: '',
};

class HistoryPanel extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.payments = this.controller.getPayments();

    this.inputInfo = { ...initalInputInfo };

    this.mode = 'ADD';
    this.dealTypes = {
      expenditure: -1,
      income: 1,
    };
    this.dealType = this.dealTypes.expenditure;
    this.submitIcon = check;
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.CLICK_ACCOUNT,
      this,
      this.handleAccountClick
    );
    this.observer.subscribe(notifyTypes.INIT_USER, this, this.handleInitUser);
    this.observer.subscribe(notifyTypes.FETCHED_DATA, this, this.render);
    this.observer.subscribe(
      notifyTypes.DELETE_ACCOUNT,
      this,
      this.handleDeleteAccount
    );

    this.render();
  }

  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.CLICK_ACCOUNT, this);
    this.observer.unsubscribe(notifyTypes.INIT_USER, this);
    this.observer.unsubscribe(notifyTypes.FETCHED_DATA, this);
    this.observer.unsubscribe(notifyTypes.DELETE_ACCOUNT, this);
  }

  handleAccountClick = (accountInfo) => {
    const { date, category, content, price, payment, id } = accountInfo;

    if (id === this.inputInfo.id) {
      this.inputInfo = { ...initalInputInfo };
      this.mode = 'ADD';
      this.submitIcon = check;
    } else {
      this.inputInfo = {
        ...this.inputInfo,
        id,
        date: parsingDate(date, 'inputCalendar'),
        category,
        payment,
        content,
        price,
      };

      if (this.inputInfo.price > 0) {
        this.dealType = this.dealTypes.income;
      } else {
        this.dealType = this.dealTypes.expenditure;
      }
      this.inputInfo.price = Math.abs(this.inputInfo.price);
      this.mode = 'MODIFY';
      this.submitIcon = pencil;
    }

    this.render();
    this.selectCategory(this.inputInfo.category);
    this.selectPayment(this.inputInfo.payment);
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
    const categoryId = parseInt(id);
    const $selectCategoryBtn = this.querySelector('#select-category-btn');
    if (categoryId) {
      $selectCategoryBtn
        .setHTML(`${categories[categoryId - 1]} ${chevronDown}`)
        .addClass('selected');
    }

    this.inputInfo = { ...this.inputInfo, categoryId };
  };

  selectPayment = (id) => {
    const paymentId = parseInt(id);
    const $selectPaymentBtn = this.querySelector('#select-payment-btn');
    const payment = this.payments.find((p) => p.id === paymentId);
    if (payment) {
      $selectPaymentBtn
        .setHTML(`${payment?.name} ${chevronDown}`)
        .addClass('selected');
    }
    this.inputInfo = { ...this.inputInfo, paymentId };
  };

  handleAddPayment = () => {
    this.observer.notify(notifyTypes.CLICK_ADD_PAYMENT);
  };

  handleModifyPayment = (id) => {
    this.observer.notify(notifyTypes.CLICK_EDIT_PAYMENT, Number(id));
  };

  handleDeleteAccount = async (id) => {
    const result = await this.controller.deleteAccount(id);
    this.showResultViewer(result);
    if (result.success) {
      this.inputInfo = { ...initalInputInfo };
      this.mode = 'ADD';
      this.submitIcon = check;
    }
  };

  checkCanSubmit = () => {
    return !Object.keys(this.inputInfo).some(
      (field) => this.inputInfo[field] === ''
    );
  };

  showResultViewer = (result) => {
    this.observer.notify(notifyTypes.SHOW_RESULT, result);
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
      this.toggleCategoryDropdown();
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
      this.togglePaymentDropdown();
    });

    this.addEventListener('input', ({ target }) => {
      if (target.tagName === 'INPUT') {
        if (target.name === 'price') {
          const price = target.value;
          if (price < 0) {
            target.value = Math.abs(price);
          }
        }
        this.inputInfo = { ...this.inputInfo, [target.name]: target.value };
      }
    });

    const $checkbox = this.querySelector('.check-box');
    $checkbox.addEventListener('click', async () => {
      if (!this.checkCanSubmit()) {
        this.showResultViewer({
          success: false,
          message: '정보를 모두 입력해 주세요',
        });
        return;
      }
      this.inputInfo = {
        ...this.inputInfo,
        date: new Date(this.inputInfo.date),
      };

      if (this.dealType === this.dealTypes.income) {
        this.inputInfo.price = Math.abs(this.inputInfo.price);
      } else {
        this.inputInfo.price = -1 * Math.abs(this.inputInfo.price);
      }

      if (this.mode === 'ADD') {
        const result = await this.controller.addAccount(this.inputInfo);
        this.showResultViewer(result);
        if (result.success) {
          this.inputInfo = { ...initalInputInfo };
        }
        return;
      } else if (this.mode === 'MODIFY') {
        const result = await this.controller.updateAccount(this.inputInfo);
        this.showResultViewer(result);
        if (result.success) {
          this.inputInfo = { ...initalInputInfo };
          this.mode = 'ADD';
          this.submitIcon = check;
        }
        return;
      }
    });

    const $toggleDealTypeBtn = this.querySelector('#toggle-dealType-btn');
    $toggleDealTypeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.currentTarget.toggleClass('default');
      const currentState = event.currentTarget.getAttr('class');
      if (currentState) {
        this.dealType = this.dealTypes.expenditure;
      } else {
        this.dealType = this.dealTypes.income;
      }
    });
  };

  render = () => {
    const { date, content, price } = this.inputInfo;
    this.setHTML(/*html*/ `
        <form>
          
            <div class="history-input-box">
                <label>일자</label>
                <input 
                  type="date" 
                  name="date" 
                  value='${date}'
                  autocomplete='off'
                />
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
                  name="content" 
                  placeholder="입력하세요"
                  autocomplete="off"
                  ${content ? `value='${content}'` : ''}
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
                        <button id="toggle-dealType-btn" type="button" class="${
                          this.dealType === this.dealTypes.expenditure
                            ? 'default'
                            : ''
                        }">
                          <span class="income">
                            수입
                          </span>
                          <span class="expenditure">
                            지출
                          </span>
                        </button>
                    <input 
                      type="number" 
                      placholder="입력하세요" 
                      name="price" 
                      autocomplete='off'
                      ${price ? `value=${price}` : ''}
                    />
                      &nbsp;원
                </div>
            </div>

            <div class="check-box">
                ${this.submitIcon}
            </div>
        </form> 
    `);

    this.addEvents();
  };
}

customElements.define('history-panel', HistoryPanel);

export default customElements.get('history-panel');
