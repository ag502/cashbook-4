import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import { check, chevronDown, iconButton } from '../icons';
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

const payments = ['현대카드', '삼성카드'];

class HistoryPanel extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;

    this.currentDate = this.controller.getCurrentDate();

    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentDate = this.currentDate.getDate();

    this.dateString = parsingDate(new Date());

    this.date = this.dateString;
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.CLICK_RECORD,
      this,
      this.handleRecordClick
    );

    this.render();
  }

  handleRecordClick = (recordInfo) => {
    const { date, category, content, paymentMethod, price } = recordInfo;
    this.date = date;
    this.dateString = parsingDate(this.date);
    this.category = category;
    this.content = content;
    this.paymentMethod = paymentMethod;
    this.price = price;

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
  };

  selectPayment = (id) => {
    this.togglePaymentDropdown();
    const $selectPaymentBtn = this.querySelector('#select-payment-btn');
    $selectPaymentBtn.innerHTML = `${payments[id]} ${chevronDown}`;
    $selectPaymentBtn.classList.add('selected');
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
      this.selectPayment(target.dataset.id);
    });
  };

  render = () => {
    this.innerHTML =
      /*html*/ `
        <form>
            <div class="history-input-box">
                <label>일자</label>
                <input type="text" name="time" value=` +
      `${this.dateString}` +
      `>
            </div>
                

            <div class="history-input-box">
                <label>분류</label>
                <button id="select-category-btn">선택하세요 ${chevronDown}</button>
                <div class="dropdown category">
                  ${categories
                    .map((category, index) => {
                      return (
                        '<div class="category-item" data-id=' +
                        index +
                        '>' +
                        '<div class="content">' +
                        category +
                        '</div>' +
                        '</div>'
                      );
                    })
                    .join('')}
                </div>
            </div>


            <div class="history-input-box context">
                <label>내용</label>
                <input type="text" name="context" placeholder="입력하세요" ${
                  this.content ? "value='" + this.content + "'" : ''
                }>
            </div>


            <div class="history-input-box">
                <label>결제수단</label>
                <button id="select-payment-btn">선택하세요 ${chevronDown}</button>
                <div class="dropdown payment">
                      ${payments
                        .map((category, index) => {
                          return (
                            '<div class="payment-item" data-id=' +
                            index +
                            '>' +
                            '<div class="payment">' +
                            category +
                            '</div>' +
                            '</div>'
                          );
                        })
                        .join('')}
                    </div>
            </div>


            <div class="history-input-box cash">
                <label>금액</label>
                <div class="cost-content">
                    ${iconButton}
                    <input type="number" placholder="입력하세요" ${
                      this.content ? "value='" + this.price + "'" : ''
                    }>&nbsp;원
                    
                </div>
            </div>

            <div class="check-box">
                ${check}
            </div>
        </form> 
    `;

    this.addEvents();
  };
}

customElements.define('history-panel', HistoryPanel);

export default customElements.get('history-panel');
