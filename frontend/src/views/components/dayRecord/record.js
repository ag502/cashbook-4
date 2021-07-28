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
            <div class="category category1">
                ${this.recordInfo.category}
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
