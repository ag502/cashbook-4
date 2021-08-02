class MainChart extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
      <div class='main-chart--container'></div>
    `);
  };
}

customElements.define('main-chart', MainChart);
export default customElements.get('main-chart');
