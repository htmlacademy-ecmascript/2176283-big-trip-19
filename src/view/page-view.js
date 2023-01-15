import AbstractView from '../framework/view/abstract-view.js';

function createPageTemplate() {
  return (`<main class="page-body__page-main  page-main">
  </main>`);
}

export default class PageView extends AbstractView {

  get template() {
    return createPageTemplate();
  }

}
