import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTimeEdit } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createEditPointTemplate = (point, destinations, offersByType) => {
  const { basePrice, dateTo, dateFrom, offers, destination, type, id, isSaving, isDeleting, isDisabled } = point;
  const dateEnd = humanizeTimeEdit(dateTo);
  const dateStart = humanizeTimeEdit(dateFrom);
  const pointTypeOffer = offersByType.find((offer) => offer.type === point.type);
  const pointDestination = destinations.find((item) => destination === item.id);
  const destinationName = destination !== null ? pointDestination.name : '';

  const offersTemplate = pointTypeOffer.offers.map((offer) => {
    const checked = offers.includes(offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-${offer.title}-${offer.id}" ${isDisabled ? 'disabled' : ''} type="checkbox" ${checked} value = ${offer.id} name=${offer.title}  ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-${offer.title}-${offer.id}">
          <span class="event__${offer.title}">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__${offer.price}">${offer.price}</span>
        </label>
      </div>`;
  }).join('');

  const destinationPoint = destinations.map((city) => `<option value="${he.encode(city.name)}"></option>`).join('');

  const iconTypeTemplate = offersByType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}" ${element.type === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-1">${element.type}</label>
    </div>`
  ).join('');


  const picturesTemplate = () => {
    if(pointDestination.pictures.length) {
      const template = pointDestination.pictures.map((element) =>`
            <img class="event__photo" src="${element.src}" alt="${element.description}">`).join('');
      return template;
    }
    else
    {
      return '';
    }
  };

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox"${isDisabled ? 'disabled' : ''}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${iconTypeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${he.encode(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${destinationPoint}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time--${id} ">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${he.encode(dateStart)}"${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time--${id} ">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${he.encode(dateEnd)}"${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'deleting...' : 'delete'}</button>
      <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersTemplate}
        </div>
      </section>

      ${pointDestination ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestination.description}</p>` : ''}
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${picturesTemplate()}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`);
};

export default class EditPointView extends AbstractStatefulView {

  #destinations = null;
  #offers = null;
  #citys = null;
  #handleFormSubmit = null;
  #handleRollupBtnClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point, destinations, offers, citys, onFormSubmit, onRollupBtnClick, onDeleteClick}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#citys = citys;
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtnClick = onRollupBtnClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offers);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }


    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupBtnClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeLabelHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#onOffersChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinationHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#onPriceChange);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickerFrom();

    this.#setDatepickerTo();

  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };

  #typeLabelHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
      });
    }
  };

  #dueDateStartChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dueDateEndChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #inputDestinationHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value && this.#citys.includes(evt.target.value)) {
      this.updateElement({
        destination: this.#citys.indexOf(evt.target.value) + 1,
      });
    } else {
      evt.target.value = '';
    }
  };

  #onOffersChangeHandler = (evt) => {
    evt.preventDefault();
    const index = this._state.offers.findIndex((offers) => String(offers) === evt.target.value);
    if (index !== -1) {
      this._state.offers = [
        ...this._state.offers.slice(0, index),
        ...this._state.offers.slice(index + 1),
      ];
    }
    else {
      this._state.offers = [
        Number(evt.target.value),
        ...this._state.offers,
      ];
    }

    if (this.#offers) {
      this.updateElement({
        ...this._state,
        offers: this._state.offers,
      });
    }
  };

  #onPriceChange = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }
    this._state = {...this._state, basePrice: Number(evt.target.value)};
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        //eslint-disable-next-line
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dueDateStartChangeHandler,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        //eslint-disable-next-line
        time_24hr: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dueDateEndChangeHandler,
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isOffers: point.offers !== null,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
