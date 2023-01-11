import PointView from '../view/point-view.js';
import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-veiw.js';
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

    //render(new NewPointView(), this.#listComponent.element, RenderPosition.AFTERBEGIN);

    this.#renderListPoints();

  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const editPointComponent = new EditPointView({point});

    const replacePointToFormEdit = () => {
      this.#listComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormEditToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToFormEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

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
