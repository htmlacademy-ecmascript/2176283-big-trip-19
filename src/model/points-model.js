import { getRandomPoint } from '../mock/points';

const NUMBER_OF_WAYPOINTS = 4;

export default class PointsModel {
  points = Array.from({length: NUMBER_OF_WAYPOINTS}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
