import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter(
  {
    listContainer: tripListElement,
    pointsModel,
  }
);

render(new FilterView, tripListFilterElement);

tripPresenter.init();
