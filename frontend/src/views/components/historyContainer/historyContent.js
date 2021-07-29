import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import DayAccount from '@/views/components/dayAccount';
import notifyTypes from '@/common/utils/notifyTypes';

class HistoryContent extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.dayAccounts = this.controller.getDayAccounts();
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleDataLoad
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_DATA_FILTER,
      this,
      this.handleDataLoad
    );
  }
  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.FETCHED_DATA, this);
    this.observer.unsubscribe(notifyTypes.CHANGED_DATA_FILTER, this);
  }

  handleDataLoad = () => {
    this.dayAccounts = this.controller.getDayAccounts();
    this.render();
  };

  render = () => {
    this.setHTML('');
    // 내림차순 정렬
    const dayAccountKeys = Object.keys(this.dayAccounts).sort((a, b) => {
      return b - a;
    });

    dayAccountKeys.forEach((dayAccountKey) => {
      const $dayAccount = new DayAccount({
        date: dayAccountKey,
        accounts: this.dayAccounts[dayAccountKey],
      });

      this.appendChild($dayAccount);
    });
  };
}

customElements.define('history-content', HistoryContent);

export default customElements.get('history-content');
