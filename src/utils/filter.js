import { FilterType } from '../const.js';
import { isPointfuture, isPointPresentFrom, isPointPresentTo, isPointPast } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointfuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresentFrom(point.dateFrom) && isPointPresentTo(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo)),
};

export { filter };
