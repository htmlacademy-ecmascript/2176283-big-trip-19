import waypointView from '../view/waypoint-view.js';
import createPageTemplate from '../view/page-view.js';
import sortingView from '../view/sorting-view.js';
import listView from '../view/list-view.js';
import newPointView from '../view/new-point-view.js';
import editPointView from '../view/edit-point-view.js';
import {render} from '../render.js';


export default class ListPresenter {
  pageComponent = new createPageTemplate();
  listComponent = new listView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];

    render(this.pageComponent, this.listContainer);
    render(new sortingView(), this.pageComponent.getElement());
    render(new newPointView(),this.listComponent.getElement());
    render(new editPointView(), this.listComponent.getElement());
    render(this.listComponent, this.pageComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new waypointView({point: this.listPoints[i]}), this.listComponent.getElement());
    }

  }
}
