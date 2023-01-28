import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'hh:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY hh:mm';

function humanizeTravelDay(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
}

function humanizeTimeFromTo(dateTo) {
  return dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
}

function humanizeTimeEdit(dateTime) {
  return dateTime ? dayjs(dateTime).format(EDIT_DATE_FORMAT) : '';
}

function humanizeTravelTime(from, to) {
  return dayjs(to).diff(dayjs(from), 'h');
}

function isPointfuture(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isPointPresentFrom(dateFrom) {
  return dayjs(dateFrom).isBefore(dayjs()) || dayjs(dateFrom).isSame(dayjs());
}

function isPointPresentTo(dateTo) {
  return dayjs(dateTo).isAfter(dayjs()) || dayjs(dateTo).isSame(dayjs());
}

function isPointPast(dateTo) {
  return dayjs(dateTo).isBefore(dayjs());
}

function sortTimeDown(pointA, pointB) {
  const spendTimeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const spendTimeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return spendTimeB - spendTimeA;

}

function sortPriceDown(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  humanizeTimeFromTo, humanizeTravelDay,
  humanizeTimeEdit, humanizeTravelTime,
  isPointfuture, isPointPresentFrom,
  isPointPresentTo, isPointPast, sortPriceDown, sortTimeDown
};
