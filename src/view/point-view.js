import he from 'he';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTimeFromTo, humanizeTravelDay, humanizeTravelTime } from '../utils/point.js';

function createTripPointTemplate(point, destinations, offersByType) {
  const { basePrice, dateTo, dateFrom, destination, isFavorite, offers, type } = point;
  const dateDay = humanizeTravelDay(dateFrom);
  const dateEnd = humanizeTimeFromTo(dateTo);
  const dateStart = humanizeTimeFromTo(dateFrom);
  const travelTime = humanizeTravelTime(dateFrom, dateTo);
  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const checkedOffers = pointTypeOffer.offers.filter((offer) => offers.includes(offer.id));

  const pointDestination = destinations.find((item) => destination === item.id);

  const offersTemplate = () => {
    if (checkedOffers.length) {
      const template = checkedOffers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
      return template;
    }
    else {
      return `<li class="event__offer">
      <span class="event__offer-title">No offers</span>
      </li>`;
    }
  };

  const favoritePoint = isFavorite
    ? 'event__favorite-btn--active'
    : 'event__favorite-btn--disabled';

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${he.encode(pointDestination.name)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${dateStart}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${dateEnd}</time>
        </p>
        <p class="event__duration">${travelTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate()}
      </ul>
      <button class="event__favorite-btn ${favoritePoint}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
}

export default class PointView extends AbstractView {

  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

}
