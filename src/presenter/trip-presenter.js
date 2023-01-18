import PointView from '../view/point-view.js';
import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-veiw.js';
import { render, replace } from '../framework/render.js';


export default class TripPresenter {

  #listContainer = null;
  #pointsModel = null;

  #pageComponent = new PageView();
  #listComponent = new ListView();

  #listPoints = [];

  constructor({listContainer, pointsModel})
  {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    render(this.#pageComponent, this.#listContainer);

    this.#renderListPoints();

  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormEditToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToFormEdit.call(this);
        document.removeEventListener('click', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormEditToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToFormEdit() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormEditToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }

  #renderListPoints() {
    if(this.#listPoints.every((point) => point.name)) {
      render(new NoPointView(),this.#pageComponent.element);
    }
    else {
      render(new SortingView(), this.#pageComponent.element);
      render(this.#listComponent, this.#pageComponent.element);

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
      }
    }
  }

}
