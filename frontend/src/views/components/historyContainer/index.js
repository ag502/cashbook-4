import HistoryPanel from './historyPanel'; // this can use history-statistics tag in inner html
import HistoryContent from './historyContent'; // this can use history-content tag in inner html
import historyStatistics from './historyStatistics';
import Modal from '../modal';
import AddPayment from './addPayment';
import EditPayment from './editPayment';

import observer from '@/common/utils/observer';
import historyContainerController from './controller';

import './style.css';
import notifyTypes from '@/common/utils/notifyTypes';

class HistoryContainer extends HTMLElement {
  constructor() {
    super();
    this.controller = historyContainerController;
    this.observer = observer;
    this.controller.init();

    this.modalType = {
      ADD_PAYMENT: 'add-payment',
      EDIT_PAYMENT: 'edit-payment',
    };
  }

  connectedCallback() {
    this.render();
    this.observer.subscribe(
      notifyTypes.CLICK_ADD_PAYMENT,
      this,
      this.showAddPayment
    );
    this.observer.subscribe(
      notifyTypes.CLICK_EDIT_PAYMENT,
      this,
      this.showEditPayment
    );
  }

  showEditPayment = (paymentId) => {
    this.showModalContent(this.modalType.EDIT_PAYMENT, { paymentId });
  };
  showAddPayment = () => {
    this.showModalContent(this.modalType.ADD_PAYMENT);
  };

  showModalContent = (type, data = {}) => {
    let $currentContent;
    if (type === this.modalType.ADD_PAYMENT) {
      $currentContent = new AddPayment(data);
    } else if (type === this.modalType.EDIT_PAYMENT) {
      $currentContent = new EditPayment(data);
    }
    const $addPaymentModal = new Modal({
      $contentElement: $currentContent,
    });

    this.appendChild($addPaymentModal);
  };

  render = () => {
    this.setHTML(
      /*html*/ `
      <div class="history-panel-fixer">
        <history-panel></history-panel>
      </div>
      <history-statistics></history-statistics>
      <history-content></history-content>
    `
    ).addClass('history-controller');
  };
}

customElements.define('history-container', HistoryContainer);

export default customElements.get('history-container');
