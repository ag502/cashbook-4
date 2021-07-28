import historyContainerController from './controller';
import observer from '@/common/utils/observer';
import DayRecord from '@/views/components/DayRecord';

class HistoryContent extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.dayRecords = [];
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe('model-init', this, this.handleModelInit);
  }

  handleModelInit = () => {
    this.dayRecords = this.controller.getDayRecords();
    this.render();
  };

  render = () => {
    // 내림차순 정렬
    const dayRecordKeys = Object.keys(this.dayRecords).sort((a, b) => {
      return b - a;
    });

    dayRecordKeys.forEach((dayRecordKey) => {
      const $dayRecord = new DayRecord({
        records: this.dayRecords[dayRecordKey],
      });

      this.appendChild($dayRecord);
    });
  };
}

customElements.define('history-content', HistoryContent);

export default customElements.get('history-content');
