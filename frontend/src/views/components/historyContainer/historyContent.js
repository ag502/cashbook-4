import historyContainerController from './controller';

class HistoryContent extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.innerHTML = /*html*/ `

        <div class="day-records">
            <div class="info">
                <div class="left">
                    <span class="date">
                        7월 15일
                    </span>
                    <span class="day">
                        목
                    </span>
                </div>

                <div class="right">
                    <span>수입 1,822,480</span>
                    <span>지출 9,500</span>
                </div>
            </div>

            <div class="record-list">
                <div class="record"> 
                    <div class="left">
                        <div class="category category1">
                            생활
                        </div>

                        <p class="context">
                            7월 월세
                        </p>
                    </div>
                    <div class="right">
                        <div class="payment">
                            현대카드
                        </div>
                        <div class="price">
                            -500,000 원
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `;
  };
}

customElements.define('history-content', HistoryContent);

export default customElements.get('history-content');
