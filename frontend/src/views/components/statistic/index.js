import MainChart from './mainChart';
import SubChart from './subChart';
import './style.css';

class Statistic extends HTMLElement {
  connectedCallback() {
    this.appendChild(new MainChart());
    this.appendChild(new SubChart());
  }
}

customElements.define('statistic-container', Statistic);

export default customElements.get('statistic-container');
