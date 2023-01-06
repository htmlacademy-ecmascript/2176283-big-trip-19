import PointView from '../view/point-view.js';
import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, RenderPosition } from '../render.js';


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
    render(new SortingView(), this.#pageComponent.element);
    render(new NewPointView(), this.#listComponent.element, RenderPosition.AFTERBEGIN);
    render(new EditPointView(this.#listPoints[0]), this.#listComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#listComponent, this.#pageComponent.element);

    for (let i = 1; i < this.#listPoints.length; i++) {
      render(new PointView({point: this.#listPoints[i]}), this.#listComponent.element);
    }

  }
}
