import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-veiw.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortPriceDown, sortTimeDown } from '../utils/point.js';

export default class TripPresenter {

  #listContainer = null;
  #pointsModel = null;

  #pageComponent = new PageView();
  #listComponent = new ListView();
  #sortingComponent = null;
  #noPointCompoient = new NoPointView();

  #pointPresenter = new Map();
  //Исходный выбранный вариант сортировки
  #currentSortingType = SortType.DAY;

  constructor({listContainer, pointsModel})
  {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch(this.#currentSortingType) {
      case SortType.PRICE:
        return [...this.#pointsModel].sort(sortPriceDown);
      case SortType.TIME:
        return [this.#pointsModel].sort(sortTimeDown);
    }
    return this.#pointsModel.points;
  }

  init() {
    render(this.#pageComponent, this.#listContainer);
    this.#renderListPoints();
  }

  #handleModelChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  // когда происходит клик, то вызывается обработчик
  #handleSortingTypeChange = (sortType) => {
    //выполняем проверку, не является ли выбранный вариант сортировк текущим
    if (this.#currentSortingType === sortType) {
      return;
    }
    //сортировка компонентов
    this.#currentSortingType = sortType;
    //очищаем список
    this.#clearPointList();
    //отрисовка компонентов заново
    this.#renderPointList();
  };

  #renderSort () {
    this.#sortingComponent = new SortingView(
      {
        onSortingTypeChange: this.#handleSortingTypeChange
      }
    );
    render(this.#sortingComponent, this.#pageComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointCompoient, this.#pageComponent.element);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(
      {
        pointContainer: this.#listComponent.element,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModelChange,
      }
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    const pointCount = this.points.length;
    const points = this.points.slice(0, pointCount);
    render(this.#listComponent, this.#pageComponent.element);
    this.#renderPoints(points);
  }

  #renderListPoints() {
    render(this.#pageComponent, this.#listContainer);
    if(this.points.every((point) => point.name))
    {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      this.#renderPointList();
    }
  }
}
