import LineChart from '@/views/components/statistic/chart/line';

class SubChart extends HTMLElement {
  constructor() {
    super();
    this.lineData = {
      datasets: {
        data: [20, 100, 1000, 10000, 23453, 53533, 123213, 99999],
        backgroundColor: ['blue'],
      },
    };
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
      <div class='chart--container sub'>
        <line-chart 
          width='750'
          height='500' 
          config=${JSON.stringify(this.lineData)}
          style='width:100%;'
        >
        </line-chart>
      </div>
    `);
  };
}

customElements.define('sub-chart', SubChart);
export default customElements.get('sub-chart');
