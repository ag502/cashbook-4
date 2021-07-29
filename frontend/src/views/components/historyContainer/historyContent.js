import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import DayRecord from '@/views/components/DayRecord';
import notifyTypes from '@/common/utils/notifyTypes';

class HistoryContent extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.dayRecords = [];
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.FETCHED_DATA,
      this,
      this.handleDataChanged
    );
    this.observer.subscribe(
      notifyTypes.CHANGED_RECORD_DATA,
      this,
      this.handleDataChanged
    );
  }

  handleDataChanged = () => {
    this.dayRecords = this.controller.getDayRecords();
    this.render();
  };

  render = () => {
    this.innerHTML = '';
    // 내림차순 정렬
    const dayRecordKeys = Object.keys(this.dayRecords).sort((a, b) => {
      return b - a;
    });

    dayRecordKeys.forEach((dayRecordKey) => {
      const $dayRecord = new DayRecord({
        date: dayRecordKey,
        records: this.dayRecords[dayRecordKey],
      });

      this.appendChild($dayRecord);
    });
  };
}

customElements.define('history-content', HistoryContent);

export default customElements.get('history-content');
