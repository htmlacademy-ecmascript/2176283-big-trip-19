import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip/';

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(
  {
    pointsApiService:
    new PointsApiService(END_POINT, AUTHORIZATION)
  },
);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(
  {
    listContainer: tripListElement,
    pointsModel,
    filterModel,
    onNewPointDestroy: handleNewPointFormClose
  }
);

const filterPresenter = new FilterPresenter({
  filterContainer: tripListFilterElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();
pointsModel.init()
  .finally(() =>{
    render(newPointButtonComponent, tripListElement);
  });
