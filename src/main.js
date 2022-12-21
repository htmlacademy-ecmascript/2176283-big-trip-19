import tripListFilterView from './view/filter-view.js';
import ListPresenter from './presenter/way-presenter.js';
import {render} from './render.js';
import PointsModel from './model/points-model.js';

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const listPresenter = new ListPresenter({
  listContainer: tripListElement,
  pointsModel});

render(new tripListFilterView(), tripListFilterElement);
listPresenter.init();
