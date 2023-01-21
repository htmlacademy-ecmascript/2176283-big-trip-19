import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {

  #pointContainer = null;
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;

  constructor({pointContainer}) {
    this.#pointContainer = pointContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#pointContainer);
  }


  #replacePointToFormEdit() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  #replaceFormEditToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormEditToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToFormEdit();
  };

  #handleFormSubmit = () => {
    this.#replaceFormEditToPoint();
  };

}
