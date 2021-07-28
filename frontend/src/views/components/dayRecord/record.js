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

class Record extends HTMLElement {
  constructor(recordInfo) {
    super();
    this.recordInfo = recordInfo;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `
        <div class="left">
            <div class="category category${this.recordInfo.category}">
                ${getCategoryString(this.recordInfo.category)}
            </div>

            <p class="context">
                ${this.recordInfo.content}
            </p>
        </div>
        <div class="right">
            <div class="payment">
                ${this.recordInfo.paymentMethod}
            </div>
            <div class="price">
                ${this.recordInfo.price} 원
            </div>
        </div>
      `;
  };
}

customElements.define('record-item', Record);

export default customElements.get('record-item');
