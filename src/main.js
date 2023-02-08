import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { getRandomPoint } from './mock/points.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_TASK = 'https://19.ecmascript.pages.academy/big-trip/';

const NUMBER_OF_WAYPOINTS = 5;
const mockPoints = Array.from({length: NUMBER_OF_WAYPOINTS}, getRandomPoint);

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const pointsModel = new PointsModel(
  {pointsApiService: new PointsApiService(END_TASK, AUTHORIZATION)
  },
  mockPoints,
  filterModel,
);

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
