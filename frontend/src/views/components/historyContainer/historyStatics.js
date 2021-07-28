import { check, iconButton } from '../icons';
import historyContainerController from './controller';

class HistoryStatics extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.currentDate = this.controller.getCurrentDate();

    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentDate = this.currentDate.getDate();

    this.todayString =
      this.currentYear +
      (this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth) +
      (this.currentDate < 10 ? '0' + this.currentDate : this.currentDate);
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML =
      /*html*/ `
        <form>
            <div class="history-input-box">
                <label>일자</label>
                <input type="text" name="time" value=` +
      `${this.todayString}` +
      `>
            </div>
                

            <div class="history-input-box">
                <label>분류</label>
                <button id="select-category-button">선택하세요</button>
            </div>


            <div class="history-input-box context">
                <label>내용</label>
                <input type="text" name="context" placeholder="입력하세요">
            </div>


            <div class="history-input-box">
                <label>결제수단</label>
                <button id="select-payment-button">선택하세요</button>
            </div>


            <div class="history-input-box cash">
                <label>금액</label>
                <div class="cost-content">
                    ${iconButton}
                    <input type="number" placholder="입력하세요">&nbsp;원
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
