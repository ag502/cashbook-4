import Headers from '@/views/components/header/header';
import Statistic from '@/views/components/statistic';

class StaticsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setHTML(
      /*html*/
      `
        <main-header></main-header>
        <statistic-container></statistic-container>
      `
    );
  }
}

customElements.define('statistic-page', StaticsPage);
export default customElements.get('statistic-page');
