import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NoPointView from '../view/no-point-veiw.js';
import LoadingView from '../view/loading-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortPriceDown, sortTimeDown } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {

  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pageComponent = new PageView();
  #listComponent = new ListView();
  #loadingComponent = new LoadingView();
  #sortingComponent = null;
  #noPointCompoient = new NoPointView();

  #pointPresenter = new Map();
  //Исходный выбранный вариант сортировки и фильтрации
  #currentSortingType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #isLoading = true;

  constructor({listContainer, pointsModel, filterModel})
  {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortingType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDown);
    }
    return filteredPoints;
  }

  init() {
    //render(this.#pageComponent, this.#listContainer);
    this.#renderList();
  }

  #handleModelChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Вызываем обновление модели.
    // actionType - действие пользователя чтобы понять какой метод модели вызвать
    // updateType - тип изменений чтобы понять что после действия нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearList({resertSortingType: true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
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
    this.#clearList();
    //отрисовка компонентов заново
    this.#renderList();
  };

  #renderSort () {
    this.#sortingComponent = new SortingView(
      {
        currentSortingType: this.#currentSortingType,
        onSortingTypeChange: this.#handleSortingTypeChange
      }
    );
    render(this.#sortingComponent, this.#pageComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pageComponent.element,
      RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    render(this.#noPointCompoient, this.#pageComponent.element);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(
      {
        pointContainer: this.#listComponent.element,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#handleModelChange,
      }
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearList({ resertSortingType = false } = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingComponent);
    remove(this.#noPointCompoient);
    if (resertSortingType) {
      this.#currentSortingType = SortType.DAY;
    }
  }

  #renderList() {
    render(this.#pageComponent, this.#listContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const pointCount = this.points.length;
    const points = this.points.slice(0, pointCount);
    if (pointCount === 0) {
      this.#renderNoPoints();
    }

    this.#renderSort();
    render(this.#listComponent, this.#pageComponent.element);


    this.#renderPoints(points);
  }
}
