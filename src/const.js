//import dayjs from 'dayjs';

/*const addDays = 3;
const START_DATE = dayjs().toISOString();
const END_DATE = dayjs().add((addDays),'day').toISOString();
*/
const TYPES_POINT = ['bus', 'taxi', 'train', 'ship', 'flight', 'drive', 'restaurant', 'sightseeing', 'check-in'];

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: null,
  isFavorite: false,
  offers: [],
  type: TYPES_POINT[0],
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


export { FilterType, SortType, UserAction, UpdateType, BLANK_POINT, TYPES_POINT };
