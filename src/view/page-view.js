import AbstractView from '../framework/view/abstract-view.js';

function createPageTemplate() {
  return (`<main class="page-body">
  </main>`);
}

export default class PageView extends AbstractView {

  get template() {
    return createPageTemplate();
  }

}
