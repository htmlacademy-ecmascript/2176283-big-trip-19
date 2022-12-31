import PointView from '../view/point-view.js';
import PageView from '../view/page-view.js';
import SortingView from '../view/sorting-view.js';
import ListView from '../view/list-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, RenderPosition } from '../render.js';


export default class TripPresenter {
  pageComponent = new PageView();
  listComponent = new ListView();

  constructor({listContainer, pointsModel})
  {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];

    render(this.pageComponent, this.listContainer);
    render(new SortingView(), this.pageComponent.getElement());
    render(new NewPointView(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new EditPointView(this.listPoints[0]), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(this.listComponent, this.pageComponent.getElement());

    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView({point: this.listPoints[i]}), this.listComponent.getElement());
    }

  }
}
