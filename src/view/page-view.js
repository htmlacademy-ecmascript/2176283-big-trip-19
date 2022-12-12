import {createElement} from '../render.js';

function createPageTemplate() {
  return (`<main class="page-body__page-main  page-main">
  </main>`);
}

export default class waypointView {
  getTemplate() {
    return createPageTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

