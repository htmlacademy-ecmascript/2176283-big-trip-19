import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTimeEdit } from '../utils/point.js';
import { offersByType, destinations } from '../mock/points.js';
import dayjs from 'dayjs';

const START_DATE = dayjs().toISOString();
const END_DATE = dayjs().add((3),'day').toISOString();

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: START_DATE,
  dateTo: END_DATE,
  destination: 0,
  id: 0,
  offers: [],
  type: 'taxi'
};

const createEditPointTemplate = (point) => {
  const { basePrice, dateTo, dateFrom, offers, destination, type } = point;
  const dateEnd = humanizeTimeEdit(dateTo);
  const dateStart = humanizeTimeEdit(dateFrom);
  const pointTypeOffer = offersByType.find((offer) => offer.type === point.type);

  const pointDestination = destinations.find((item) => destination === item.id);

  const offersTemplate = pointTypeOffer.offers.map((offer) =>{
    const checked = offers.includes(offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${point.id}" type="checkbox" ${checked} name=${offer.title}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }).join('');

  const destinationPoint = destinations.map((element) =>`<option value="${element.name}"></option>`).join('');

  const iconTypeTemplate = offersByType.map((element) =>
    `<div class="event__type-item">
      <input id="event-${element.type}-${element.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}">
      <label class="event__type-label  event__type-label--${element.type}" for="event-${element.type}-${element.id}">${element.type}</label>
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
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${iconTypeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationPoint}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
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

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestination.description}</p>
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

  #handleFormSubmit = null;
  #handleRollupBtnClick = null;

  constructor({point = BLANK_POINT, onFormSubmit, onRollupBtnClick}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtnClick = onRollupBtnClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupBtnClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeLabelHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinacionHandler);
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

  #inputDestinacionHandler = (evt) => {
    evt.preventDefault();
  };

  static parsePointToState(point) {
    return {...point,
      isOffers: point.offers !== null,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
