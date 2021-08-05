import Header from '@/views/components/header/header';
import Statistic from '@/views/components/statistic';

class StaticsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const path = window.location.pathname;
    const header = new Header(path);
    const statistic = new Statistic();
    this.setHTML('').addElement(header).addElement(statistic);
  }
}

customElements.define('statistic-page', StaticsPage);
export default customElements.get('statistic-page');
