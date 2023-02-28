import AbstractView from '../framework/view/abstract-view.js';

const createLoadingErrorTemplate = () =>
  ('<p class="trip-events__msg">Something went wrong. Try restart the page</p>');


export default class LoadingErrorView extends AbstractView {


  get template() {
    return createLoadingErrorTemplate();
  }

}
