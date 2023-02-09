import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

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
  }
);

const filterPresenter = new FilterPresenter({
  filterContainer: tripListFilterElement,
  filterModel,
  pointsModel
});

filterPresenter.init();
tripPresenter.init();
pointsModel.init();
