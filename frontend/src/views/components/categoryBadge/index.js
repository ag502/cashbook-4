import { getCategoryString } from '@/common/utils/functions';
import './style.css';

class CategoryBadge extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render = () => {
    const categoryId = this.getAttribute('categoryId');
    const { name, color } = getCategoryString(categoryId);
    this.setHTML(/*html*/ `
      <div class='category' style='background-color:${color};'>
        ${name}
      </div>
    `);
  };
}

customElements.define('category-badge', CategoryBadge);
export default customElements.get('category-badge');
