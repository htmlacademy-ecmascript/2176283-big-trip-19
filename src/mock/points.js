import { getRandomArrayElement } from '../utils/common.js';
//import {TYPE} from '../const.js';

const destinations = [
  {
    id: 0,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonixx',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${Math.random()}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 1,
    description: 'San Jose, officially San José, is the cultural, financial, and political center of Silicon Valley.',
    name: 'San Jose',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${Math.random()}`,
        description: 'Attractions San Jose'
      }
    ]
  },
  {
    id: 2,
    description: 'San Francisco is the fourth most populous in California and 17th most populous in the United States.',
    name: 'San Francisco',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${Math.random()}`,
        description: 'Local views of San Francisco'
      }
    ]
  }
];

const offers = [
  {
    id: 0,
    title: 'Upgrade to a business class',
    price: 120
  },
  {
    id: 1,
    title: 'Excursion',
    price: 80
  },
  {
    id: 3,
    title: 'Lunch',
    price: 50
  },
  {
    id: 4,
    title: 'Breakfast',
    price: 40
  },
  {
    id: 5,
    title: 'Hotel',
    price: 120
  },
  {
    id: 6,
    title: 'Supper',
    price: 60
  },
];

const offersByType = [
  {
    type: 'taxi',
    offers: offers.filter((offer) => offer.id === 0 || offer.id === 1 || offer.id === 4)
  },
  {
    type: 'bus',
    offers: offers.filter((offer) => offer.id === 1 || offer.id === 3 || offer.id === 4 || offer.id === 5 || offer.id === 6)
  },
  {
    type: 'train',
    offers: offers.filter((offer) => offer.id === 3 || offer.id === 4 || offer.id === 6)
  },
  {
    type: 'ship',
    offers: offers.filter((offer) => offer.id === 3 || offer.id === 4 || offer.id === 6)
  },
  {
    type: 'drive',
    offers: offers.filter((offer) => offer.id === 1 || offer.id === 3 || offer.id === 4 || offer.id === 5 || offer.id === 6)
  },
  {
    type: 'flight',
    offers: offers.filter((offer) => offer.id === 0 || offer.id === 3 || offer.id === 4 || offer.id === 6)
  },
  {
    type: 'check-in',
    offers: offers.filter((offer) => offer.id === 0 || offer.id === 1 || offer.id === 2 || offer.id === 3 || offer.id === 4 || offer.id === 5 || offer.id === 6)
  },
  {
    type: 'sightseeing',
    offers: offers.filter((offer) => offer.id === 1 || offer.id === 3 || offer.id === 4 || offer.id === 6)
  },
  {
    type: 'restaurant',
    offers: offers.filter((offer) => offer.id === 3 || offer.id === 4 || offer.id === 6)
  }
];

const point = [
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T19:55:56.845Z',
    dateTo: '2019-07-11T09:20:13.375Z',
    destination: /*getRandomArrayElement(destinations)*/2,
    id: 0,
    isFavorite: false,
    offers: [0, 1, 4],
    //type: getRandomArrayElement(TYPE)
    type: 'taxi'
  },
  {
    basePrice: 2000,
    dateFrom: '2020-07-12T20:50:56.845Z',
    dateTo: '2020-07-13T11:21:13.375Z',
    destination: /*getRandomArrayElement(destinations)*/0,
    id: 1,
    isFavorite: true,
    offers: /*getRandomArrayElement(offers)*/[1, 3, 4, 5, 6],
    //type: getRandomArrayElement(TYPE)
    type: 'bus',
  },
  {
    basePrice: 3000,
    dateFrom: '2021-07-14T21:55:56.845Z',
    dateTo: '2021-07-15T12:22:13.375Z',
    destination: /*getRandomArrayElement(destinations)*/1,
    id: 2,
    isFavorite: false,
    offers:/* getRandomArrayElement(offers)*/[3, 4, 6],
    //type: getRandomArrayElement(TYPE)
    type: 'train'
  },
  {
    basePrice: 4500,
    dateFrom: '2021-07-14T22:55:56.845Z',
    dateTo: '2021-07-15T12:23:13.375Z',
    destination: /*getRandomArrayElement(destinations)*/0,
    id: 3,
    isFavorite: true,
    offers: /*getRandomArrayElement(offers)*/[3, 4, 6],
    //type: getRandomArrayElement(TYPE)
    type: 'ship'
  },
];

function getRandomPoint() {
  return getRandomArrayElement(point);
}

export { getRandomPoint, offersByType, destinations };
