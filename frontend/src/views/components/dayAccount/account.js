import observer from '@/common/utils/observer';
import notifyTypes from '@/common/utils/notifyTypes';
import { getCategoryString } from '@/common/utils/functions';
import { deleteBtn } from '../icons';

class Account extends HTMLElement {
  constructor(accountInfo) {
    super();
    this.accountInfo = accountInfo;
    this.observer = observer;
    this.isClicked = false;
  }

  connectedCallback() {
    this.observer.subscribe(
      notifyTypes.CLICK_ACCOUNT,
      this,
      this.handleToggleAccount
    );
    this.render();
    this.addEvents();
  }

  disconnectedCallback() {
    this.observer.unsubscribe(notifyTypes.CLICK_ACCOUNT, this);
  }

  handleToggleAccount = ({ id }) => {
    const { id: myId } = this.accountInfo;
    if (myId !== id) {
      this.removeClass('select');

      const $eraseBtn = this.querySelector('.erase');
      if ($eraseBtn.classList.contains('show')) {
        $eraseBtn.addClass('unshow');
        $eraseBtn.removeClass('show');
      }
    }
  };

  addEvents = () => {
    const $eraseBtn = this.querySelector('.erase');

    this.addEventListener('click', () => {
      this.toggleClass('select');
      this.observer.notify(notifyTypes.CLICK_ACCOUNT, this.accountInfo);

      if (this.classList.contains('select')) {
        $eraseBtn.addClass('show');
        $eraseBtn.removeClass('unshow');
      } else {
        $eraseBtn.addClass('unshow');
        $eraseBtn.removeClass('show');
      }
    });

    $eraseBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      console.log('a');
      this.observer.notify(notifyTypes.DELETE_ACCOUNT, this.accountInfo.id);
    });
  };

  render = () => {
    this.setHTML(/*html*/ `
        <div class="left">
            <div 
              class="category" 
              style='background-color:${
                getCategoryString(this.accountInfo.category).color
              };'
              >
                ${getCategoryString(this.accountInfo.category).name}
            </div>

            <p class="context">
                ${this.accountInfo.content}
            </p>
        </div>
        <div class="right">
            <div class="payment">
                ${
                  this.accountInfo.paymentMethod
                    ? this.accountInfo.paymentMethod
                    : '?????????'
                }
            </div>
            <div class="price">
                ${this.accountInfo.price.toLocaleString()} ???
            </div>
        </div>
        <div class="erase">
          ${deleteBtn}
        </div>
      `);
  };
}

customElements.define('account-item', Account);

export default customElements.get('account-item');
