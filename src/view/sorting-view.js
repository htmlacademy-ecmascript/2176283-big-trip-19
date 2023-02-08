import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortingTemplate(currentSortingType) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortingType === SortType.DAY ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DAY}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortingType === SortType.TIME ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortingType === SortType.PRICE ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`);
}

export default class SortingView extends AbstractView {
  #currentSortingType = null;
  #handleSortingTypeChange = null;
  //onSortingTypeChange - обработчик(когда изменился сам обработчик)
  constructor ({ currentSortingType, onSortingTypeChange }) {
    super();
    this.#currentSortingType = currentSortingType;
    this.#handleSortingTypeChange = onSortingTypeChange;
    //подписка на событие клик и вызывается обработчик
    document.addEventListener('click', this.#sortingTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate(this.#currentSortingType);
  }

  #sortingTypeChangeHandler = (evt) => {
    //проверка на клик по нужному тегу
    //evt.target - обращаемся к элементу на котором произошло событие
    //tagName - свойство
    if(evt.target.tagName !== 'LABEL') {
      return;
    }
    //обработчик, которому передаем тип сортировки
    //evt.target - обращаемся к элементу на котором произошло событие
    //dataset - свойство, через которое получаем значение любого дата атрибута
    //SortType - атрибут, к которому обращаемся в разметку
    this.#handleSortingTypeChange(evt.target.dataset.sortType);
  };
}
