import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-veiw.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {

  #listContainer = null;
  #pointsModel = null;

  #pageComponent = new PageView();
  #listComponent = new ListView();
  #sortingComponent = new SortingView();
  #noPointCompoient = new NoPointView();

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

  #renderSort () {
    render(this.#sortingComponent, this.#pageComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointCompoient, this.#pageComponent.element);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#listComponent.element,
    });
    pointPresenter.init(point);
  }

  #renderListPoints() {
    if(this.#listPoints.every((point) => point.name)) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();

      render(this.#listComponent, this.#pageComponent.element);

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
      }
    }
  }

}
