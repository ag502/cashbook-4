import MainChart from './mainChart';
import SubChart from './subChart';
import './style.css';

class Statistic extends HTMLElement {
  connectedCallback() {
    this.setHTML(/*html*/ `
      <div class='fixer'></div>
      <main-chart></main-chart>
      <sub-chart></sub-chart>
    `);
  }
}

customElements.define('statistic-container', Statistic);

export default customElements.get('statistic-container');
