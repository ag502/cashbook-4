import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';

const getCategoryString = (category) => {
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
  const categoryNumber = Number(category);
  return categories[categoryNumber - 1];
};

class Account extends HTMLElement {
  constructor(accountInfo) {
    super();
    this.accountInfo = accountInfo;
    this.observer = observer;
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', () => {
      this.observer.notify(notifyTypes.CLICK_ACCOUNT, this.accountInfo);
    });
  }

  render = () => {
    this.setHTML(/*html*/ `
        <div class="left">
            <div class="category category${this.accountInfo.category}">
                ${getCategoryString(this.accountInfo.category)}
            </div>

            <p class="context">
                ${this.accountInfo.content}
            </p>
        </div>
        <div class="right">
            <div class="payment">
                ${this.accountInfo.paymentMethod}
            </div>
            <div class="price">
                ${this.accountInfo.price} 원
            </div>
        </div>
      `);
  };
}

customElements.define('account-item', Account);

export default customElements.get('account-item');
