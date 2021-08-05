import './style.css';

class ScreenSaver extends HTMLElement {
  constructor($app) {
    super();
    this.$app = $app;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.setHTML(/*html*/ `
        <span>화면을 950 픽셀 이상으로 키워주세요!<span>
    `);
  };
}

customElements.define('screen-saver', ScreenSaver);

export default customElements.get('screen-saver');
