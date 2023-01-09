import { getRandomPoint } from '../mock/points.js';

const NUMBER_OF_WAYPOINTS = 5;

export default class PointsModel {
  #points = Array.from({length: NUMBER_OF_WAYPOINTS}, getRandomPoint);

  get points() {
    return this.#points;
  }
}
