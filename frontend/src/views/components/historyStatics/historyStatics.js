import { check, iconButton } from '../icons';
import './style.css';

class HistoryStatics extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `
        <form>
            <div class="date-input-box">
                <label>일자</label>
                <input type="text" name="time">
            </div>
                

            <div class="date-input-box">
                <label>분류</label>
                <button id="select-category-button">선택하세요</button>
            </div>


            <div class="date-input-box">
                <label>내용</label>
                <input type="text" name="context">
            </div>


            <div class="date-input-box">
                <label>결제수단</label>
                <button id="select-payment-button">선택하세요</button>
            </div>


            <div class="date-input-box">
                <label>금액</label>
                <div class="cost-content">
                    ${iconButton}
                    <input type="number" placholder="입력하세요">원
                </div>
            </div>

            <div class="check-box">
                ${check}
            </div>
        </form> 
    `;
  };
}

customElements.define('history-statics', HistoryStatics);

export default customElements.get('history-statics');
