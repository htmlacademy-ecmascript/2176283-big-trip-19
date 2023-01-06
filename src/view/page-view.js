import { createElement } from '../render.js';

function createPageTemplate() {
  return (`<main class="page-body__page-main  page-main">
  </main>`);
}

export default class PageView {

  #element = null;

  get template() {
    return createPageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

