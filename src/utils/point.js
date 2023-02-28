import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration);
const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY HH:mm';
const DURATION_LESS_THAN_AN_HOUR = 'mm[M]';
const DURATION_LESS_THAN_A_DAY = 'HH[H] mm[M]';
const DURATION_OF_MORE_THAN_A_DAY = 'DD[D] HH[H] mm[M]';
const MILLISECONDS_AMOUNT_IN_HOUR = 3600000;
const MILLISECONDS_AMOUNT_IN_DAY = 86400000;

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

  const eventDuration = dayjs(to).diff(dayjs(from));

  if (eventDuration > MILLISECONDS_AMOUNT_IN_DAY) {
    return dayjs.duration(eventDuration).format(DURATION_OF_MORE_THAN_A_DAY);
  }

  if (eventDuration < MILLISECONDS_AMOUNT_IN_DAY) {
    return dayjs.duration(eventDuration).format(DURATION_LESS_THAN_A_DAY);
  }

  if (eventDuration < MILLISECONDS_AMOUNT_IN_HOUR) {
    return dayjs.duration(eventDuration).format(DURATION_LESS_THAN_AN_HOUR);
  }
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
