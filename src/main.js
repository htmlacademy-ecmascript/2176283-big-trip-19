import tripListFilterView from './view/filter-view.js';
import ListPresenter from './presenter/board-presenter.js';
import {render} from './render.js';

const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const listPresenter = new ListPresenter({listContainer: tripListElement});

render(new tripListFilterView(), tripListFilterElement);
listPresenter.init();
