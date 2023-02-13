import dayjs from 'dayjs';

const addDays = 3;
const START_DATE = dayjs().toISOString();
const END_DATE = dayjs().add((addDays),'day').toISOString();

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: START_DATE,
  dateTo: END_DATE,
  destination: 0,
  id: 0,
  offers: [],
  type: 'taxi'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { FilterType, SortType, UserAction, UpdateType, BLANK_POINT };
