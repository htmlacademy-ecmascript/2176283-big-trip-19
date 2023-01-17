import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterItemTemplate(filter, isChecked) {
  const{ name } = filter;

  return(
    `<input id="filter-${name}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="${name}"
    ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>`
  );
}

function createTripFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems

    .map((filter, index) => createTripFilterItemTemplate(filter, index === 0))
    .join('');

  return (
    `<div class="trip-filters__filter">
    ${filterItemsTemplate}
    </div>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFilterTemplate(this.#filters);
  }
}
