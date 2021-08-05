import { SVG_URL } from '@/common/utils/constant';
import chartController from '../controller';

const SVG_PADDING = 60;
const MAX_SPACE = 10;
const UNIT = 1;

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const getNumOfDigits = (number) => {
  return Math.floor(Math.log10(number));
};

const almostEquals = (x, y, epsilon) => {
  return Math.abs(x - y) < epsilon;
};

const niceNum = (range) => {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1000)
    ? roundedRange
    : range;
  const niceRange = Math.pow(10, getNumOfDigits(range));
  const fraction = range / niceRange;
  const niceFraction =
    fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
};

class LineChart extends HTMLElement {
  constructor() {
    super();
    this.xCoor = [];
    this.chartController = chartController;
    this.initBaseData();
  }

  connectedCallback() {
    this.render();
  }

  initBaseData = () => {
    this.config = JSON.parse(this.getAttr('config'));
    this.svgW = parseInt(this.getAttr('width')) - SVG_PADDING || 300;
    this.svgH = parseInt(this.getAttr('height')) - SVG_PADDING || 300;

    this.style.display = 'inline-block';

    const { datasets } = this.config;
    const [max, min] = [Math.max(...datasets.data), 0];
    this.spacing = niceNum((max - min) / MAX_SPACE / UNIT) * UNIT;
    this.basicsUnit = getNumOfDigits(this.spacing);
    this.start = Math.floor(min / this.spacing) * this.spacing;
    this.finish = Math.ceil(max / this.spacing) * this.spacing;
    this.unitCalibration = this.svgH / (this.finish - this.start);
  };

  convertX = (x) => {
    return x + SVG_PADDING / 2;
  };

  convertY = (y) => {
    return this.svgH - y + SVG_PADDING / 2;
  };

  makeAnimation = ($element) => {
    if ($element.tagName === 'path') {
      $element.animate([{ strokeDashoffset: 5000 }, { strokeDashoffset: 0 }], {
        duration: 2000,
        fill: 'forwards',
      });
    } else if ($element.tagName === 'g') {
      $element.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 2000,
        fill: 'forwards',
      });
    }
  };

  makeXAxis = () => {
    const numOfLines = (this.finish - this.start) / this.spacing;
    const interval = this.svgH / numOfLines;
    const xAxis = [...Array(numOfLines + 1).keys()]
      .map(
        (nth) => /*html*/ `
      <line 
        x1=${this.convertX(0)} 
        x2=${this.convertX(this.svgW)} 
        y1=${this.convertY(interval * nth)} 
        y2=${this.convertY(interval * nth)}
        stroke='#F5F5F5'
      />
      <text
        x=${this.convertX(0)}
        y=${this.convertY(interval * nth)}
        dx='-1%'
        dy='1.5%'
        style='text-anchor:end;'
      >
        ${(this.spacing * nth) / 10 ** this.basicsUnit}
      </text>
    `
      )
      .join('');
    return /*html*/ `
        <g class='x-axis'>${xAxis}</g>
    `;
  };

  makeYAxis = () => {
    const curMonth = this.chartController.getCurrentDate().getMonth() + 1;
    const interval = this.svgW / 11;
    const yAxis = [...Array(12).keys()]
      .map((nth) => {
        this.xCoor.push(this.convertX(interval * nth));
        return /*html*/ `
        <line
          x1=${this.convertX(interval * nth)}
          x2=${this.convertX(interval * nth)}
          y1=${this.convertY(0)}
          y2=${this.convertY(this.svgH)}
          stroke=${nth + 1 === curMonth ? '#219A95' : '#F5F5F5'}
        />
        <text
          x=${this.convertX(interval * nth)}
          y=${this.convertY(0)}
          dy='5%'
          text-anchor='middle'
          fill=${nth + 1 === curMonth ? '#219A95' : '#000000'}
        >
          ${MONTHS[nth]}
        </text>
      `;
      })
      .join('');
    return /*html*/ `
      <g class='y-axis'>${yAxis}</g>
    `;
  };

  composePathAttr = () => {
    const { datasets } = this.config;
    const pathAttr = datasets.data
      .map((data, idx) => {
        if (idx === 0) {
          return `
          M ${this.xCoor[idx]} ${this.convertY(
            (data - this.start) * this.unitCalibration
          )}
        `;
        }
        return `
        L ${this.xCoor[idx]} ${this.convertY(
          (data - this.start) * this.unitCalibration
        )}
      `;
      })
      .join('');
    return pathAttr;
  };

  makeLine = () => {
    const { datasets } = this.config;
    const pathAttr = this.composePathAttr();
    const $line = document
      .createElementNS(SVG_URL, 'path')
      .setAttr('d', pathAttr)
      .setAttr('stroke', `${datasets.backgroundColor}`)
      .setAttr('stroke-width', 2)
      .setAttr('stroke-dasharray', 5000)
      .setAttr('fill', 'transparent');

    this.makeAnimation($line);
    return $line;
  };

  makePoint = () => {
    const { datasets } = this.config;
    const $point = document
      .createElementNS(SVG_URL, 'g')
      .addClass('data-point')
      .setHTML(
        datasets.data
          .map(
            (data, idx, arr) => /*html*/ `
              <circle
                cx=${this.xCoor[idx]}
                cy=${this.convertY((data - this.start) * this.unitCalibration)}
                r='4'
                fill=${datasets.backgroundColor}
              />
            `
          )
          .join('')
      );
    this.makeAnimation($point);
    return $point;
  };

  render = () => {
    const [xAxis, yAxis] = [this.makeXAxis(), this.makeYAxis()];

    const $svg = document
      .createElementNS(SVG_URL, 'svg')
      .setHTML(
        /*html*/ `
      ${xAxis}
      ${yAxis}
      <text
        x=${this.convertX(this.svgW)}
        y=${this.convertY(this.svgH)}
        dy='-1%'
        style='text-anchor:end;'
      >
      단위 ${(10 ** this.basicsUnit).toLocaleString()}
      </text>
    `
      )
      .addElement(this.makeLine())
      .addElement(this.makePoint());

    $svg.style.width = `${this.getAttr('width')}px`;
    $svg.style.height = `${this.getAttr('height')}px`;

    this.addElement($svg);
  };
}

customElements.define('line-chart', LineChart);
export default customElements.get('line-chart');
