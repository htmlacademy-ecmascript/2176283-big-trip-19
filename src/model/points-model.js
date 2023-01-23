import { generateFilter } from '../mock/filter.js';

export default class PointsModel {
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  get filters(){
    return generateFilter(this.#points);
  }

}
