import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #point = null;
  #destinations = [];
  #offers = [];

  #editPointComponent = null;

  constructor({pointContainer, onDataChange, onDestroy}) {
    this.#pointContainer = pointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    if (this.#editPointComponent !== null){
      return;
    }

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#editPointComponent, this.#pointContainer,
      RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if(this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
