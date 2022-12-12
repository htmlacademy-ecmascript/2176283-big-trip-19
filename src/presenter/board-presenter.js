import waypointView from '../view/waypoint-view.js';
import createPageTemplate from '../view/page-view.js';
import sortingView from '../view/sorting-view.js';
import listView from '../view/list-view.js';
import newPointView from '../view/new-point-view.js';
import editPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

const NUMBER_OF_WAYPOINTS = 3;

export default class ListPresenter {
  pageComponent = new createPageTemplate();
  listComponent = new listView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.pageComponent, this.listContainer);
    render(new sortingView(), this.pageComponent.getElement());
    render(new newPointView(),this.pageComponent.getElement());
    render(new editPointView(), this.pageComponent.getElement());
    render(this.listComponent, this.pageComponent.getElement());

    for (let i = 0; i < NUMBER_OF_WAYPOINTS; i++) {
      render(new waypointView(), this.listComponent.getElement());
    }

  }
}
