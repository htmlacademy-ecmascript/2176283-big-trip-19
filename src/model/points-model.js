import Observable from '../framework/observable.js';
import { generateFilter } from '../mock/filter.js';

export default class PointsModel extends Observable {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  get filters(){
    return generateFilter(this.#points);
  }

}
