import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { getRandomPoint } from './mock/points.js';

const NUMBER_OF_WAYPOINTS = 5;
const mockPoints = Array.from({length: NUMBER_OF_WAYPOINTS}, getRandomPoint);

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const filterModel = new FilterModel();

const pointsModel = new PointsModel(
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
