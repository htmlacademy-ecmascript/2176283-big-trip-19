import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-veiw.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPriceDown, sortTimeDown } from '../utils/point.js';

export default class TripPresenter {

  #listContainer = null;
  #pointsModel = null;

  #pageComponent = new PageView();
  #listComponent = new ListView();
  #sortingComponent = null;
  #noPointCompoient = new NoPointView();

  #listPoints = [];

  #pointPresenter = new Map();
  //Исходный выбранный вариант сортировки
  #currentSortingType = SortType.DAY;
  #sourcedListPoints = [];

  constructor({listContainer, pointsModel})
  {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    // Сохраняем исходный массив:
    this.#sourcedListPoints = [...this.#pointsModel.points];

    render(this.#pageComponent, this.#listContainer);

    this.#renderListPoints();
  }

  #handleModelChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    //При обновлении задачи делаем копию в sourcedListPoint на случай при необходимости возвращения к изначальному виду
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _listPoints
    switch(sortType) {
      case SortType.PRICE:
        this.#listPoints.sort(sortPriceDown);
        break;
      case SortType.TIME:
        this.#listPoints.sort(sortTimeDown);
        break;
      default:
        // При возврате в исходное состояниемы просто запишем в  #listPoints исходный массив
        this.#listPoints = [...this.#sourcedListPoints];
    }
    this.#currentSortingType = sortType;
  }

  // когда происходит клик, то вызывается обработчик
  #handleSortingTypeChange = (sortType) => {
    //выполняем проверку, не является ли выбранный вариант сортировк текущим
    if (this.#currentSortingType === sortType) {
      return;
    }
    //сортировка компонентов
    this.#sortPoints(sortType);
    //очищаем список
    this.#clearPointList();
    //отрисовка компонентов заново
    this.#renderPointList();
  };

  #renderSort () {
    this.#sortingComponent = new SortingView({
      onSortingTypeChange: this.#handleSortingTypeChange
    });
    render(this.#sortingComponent, this.#pageComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointCompoient, this.#pageComponent.element);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModelChange,
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList(){
    render(this.#listComponent, this.#pageComponent.element);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #renderListPoints() {
    render(this.#pageComponent, this.#listContainer);
    if(this.#listPoints.every((point) => point.name)) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();

      this.#renderPointList();
    }
  }

}
