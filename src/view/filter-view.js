import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterItemTemplate(filter, currentFilterType) {
  const { type, name } = filter;

  return(
    `<input id="filter-${name}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="${type}"
    ${type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>`
  );
}

function createTripFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createTripFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<div class="trip-filters__filter">
    ${filterItemsTemplate}
    </div>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeYandler);
  }

  get template() {
    return createTripFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeYandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
