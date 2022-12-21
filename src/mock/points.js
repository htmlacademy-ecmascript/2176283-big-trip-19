import {getRandomArrayElement} from '../utils.js';
import {TYPE} from '../const.js';

const destination = [
  {
    'id': 0,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'id': 1,
    'description': 'San Jose, officially San José, is the cultural, financial, and political center of Silicon Valley.',
    'name': 'San Jose',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0532563505164310',
        'description': 'Attractions San Jose'
      }
    ]
  },
  {
    'id': 2,
    'description': 'San Francisco is the fourth most populous in California and 17th most populous in the United States.',
    'name': 'San Francisco',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0812563705363314',
        'description': 'Local views of San Francisco'
      }
    ]
  }
];

const offer = [
  {
    'id': 0,
    'title': 'Upgrade to a business class',
    'price': 120
  },
  {
    'id': 1,
    'title': 'Excursion',
    'price': 80
  },
  {
    'id': 2,
    'title': 'Breakfast',
    'price': 40
  },
];
/*
const offersByType = [
  {
    'type': getRandomArrayElement(TYPE),
    'offers': offer
  },
  {
    'type': getRandomArrayElement(TYPE),
    'offers': offer
  },
  {
    'type': getRandomArrayElement(TYPE),
    'offers': offer
  }
];
*/
const point = [
  {
    'basePrice': 1100,
    'dateFrom': '2019-07-10T19:55:56.845Z',
    'dateTo': '2019-07-11T09:20:13.375Z',
    'destination': getRandomArrayElement(destination),
    'id': '0',
    'isFavorite': false,
    'offers': getRandomArrayElement(offer),
    'type': getRandomArrayElement(TYPE)
  },
  {
    'basePrice': 2000,
    'dateFrom': '2020-07-12T20:50:56.845Z',
    'dateTo': '2020-07-13T11:21:13.375Z',
    'destination': getRandomArrayElement(destination),
    'id': '1',
    'isFavorite': true,
    'offers': getRandomArrayElement(offer),
    'type': getRandomArrayElement(TYPE)
  },
  {
    'basePrice': 3000,
    'dateFrom': '2021-07-14T21:55:56.845Z',
    'dateTo': '2021-07-15T12:22:13.375Z',
    'destination': getRandomArrayElement(destination),
    'id': '2',
    'isFavorite': false,
    'offers': getRandomArrayElement(offer),
    'type': getRandomArrayElement(TYPE)
  },
];
/*
const localPoint = [
  {
    'base_price': 222,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(destination),
    'is_favorite': true,
    'offers': getRandomArrayElement(offer),
    'type': getRandomArrayElement(TYPE)
  }
];
*/
function getRandomPoint() {
  return getRandomArrayElement(point);
}

export{getRandomPoint};
