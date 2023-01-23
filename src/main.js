import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import { getRandomPoint } from './mock/points.js';

const NUMBER_OF_WAYPOINTS = 5;
const mockPoints = Array.from({length: NUMBER_OF_WAYPOINTS}, getRandomPoint);

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(
  mockPoints
);

const tripPresenter = new TripPresenter(
  {
    listContainer: tripListElement,
    pointsModel,
  }
);

const filters = pointsModel.filters;

render(new FilterView({filters}), tripListFilterElement);

tripPresenter.init();
