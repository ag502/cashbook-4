import { getCategoryString } from '@/common/utils/functions';
import { PI, SVG_URL } from '@/common/utils/constant';
import './style.css';

const MASK_ID = 'progress';

const convertRadian = (degree) => {
  return (degree / 180) * PI;
};

class PieChart extends HTMLElement {
  constructor() {
    super();
    this.initBasicData();
  }

  connectedCallback() {
    this.render();
  }

  initBasicData = () => {
    this.config = JSON.parse(this.getAttr('config'));

    this.svgW = parseInt(this.getAttr('width')) || 300;
    this.svgH = parseInt(this.getAttr('height')) || 300;
    this.style.display = 'inline-block';

    this.radius = this.svgW * 0.25;
    this.circleLength = 2 * PI * this.radius;
    [this.centerX, this.centerY] = [this.svgW / 2, this.svgH / 2];
    [this.startX, this.startY] = [this.centerX, this.centerY - this.radius];
  };

  makeMaskAni = ($mask) => {
    $mask.animate(
      [{ strokeDashoffset: this.circleLength }, { strokeDashoffset: 0 }],
      {
        duration: 1000,
        fill: 'forwards',
      }
    );
  };

  getFinishCoor = (degree) => {
    const finishX =
      this.centerX + this.radius * Math.cos(convertRadian(degree + 270));
    const finishY =
      this.centerY + this.radius * Math.sin(convertRadian(degree + 270));
    return [finishX, finishY];
  };

  createProgressMask = () => {
    const $progressMask = document
      .createElementNS(SVG_URL, 'mask')
      .setAttr('id', MASK_ID)
      .setAttr('maskUnits', 'userSpaceOnUse').setHTML(/*html*/ `
          <rect x='-1' y='-1' height='100%' width='100%' fill='#000000'/>
          <circle
            r=${this.radius}
            cx=${this.centerX}
            cy=${this.centerY}
            fill='transparent'
            stroke='#ffffff'
            stroke-width=${this.radius}
            stroke-dasharray=${this.circleLength}
            stroke-dashoffset=${this.circleLength}
            transform='rotate(-90 ${this.centerX} ${this.centerY})'
          />
      `);
    this.makeMaskAni($progressMask.querySelector('circle'));
    return $progressMask;
  };

  composePathAttr = (startX, startY, finishX, finishY, isLargeArc) => {
    return `
      M ${startX} ${startY}
      A ${this.radius} ${this.radius}, 0, ${
      isLargeArc ? 1 : 0
    }, 1 ${finishX} ${finishY}
    `;
  };

  createPartialPie = (pathAttr, color) => {
    return document
      .createElementNS(SVG_URL, 'path')
      .addClass('partial-pie')
      .setAttr('d', pathAttr)
      .setAttr('stroke', color)
      .setAttr('stroke-width', `${this.radius}`)
      .setAttr('fill', 'transparent')
      .setAttr('mask', `url(#${MASK_ID})`)
      .setAttr(
        'style',
        `transform-origin: ${this.centerX}px ${this.centerY}px;`
      );
  };

  render = () => {
    const { datasets } = this.config;
    const $svg = document
      .createElementNS(SVG_URL, 'svg')
      .addElement(this.createProgressMask());

    $svg.style.width = `${this.svgW}px`;
    $svg.style.height = `${this.svgH}px`;

    let accAngle = 0;
    let [curX, curY] = [this.startX, this.startY];
    this.config.forEach(({ categoryId, percent }) => {
      const curAngle = (360 * percent) / 100;
      accAngle += curAngle;
      const [finishX, finishY] = this.getFinishCoor(accAngle);

      const pathAttr = this.composePathAttr(
        curX,
        curY,
        finishX,
        finishY,
        curAngle > 180 ? true : false
      );
      [curX, curY] = [finishX, finishY];

      $svg.addElement(
        this.createPartialPie(pathAttr, getCategoryString(categoryId).color)
      );
    });

    this.addElement($svg);
  };
}

customElements.define('pie-chart', PieChart);
export default customElements.get('pie-chart');
