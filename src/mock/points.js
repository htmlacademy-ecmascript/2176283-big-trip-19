import { getRandomArrayElement } from '../mock/utils.js';
import { nanoid } from 'nanoid';

const destinations = [
  {
    id: 0,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonixx',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${Math.random()}`,
        description: 'Chamonix parliament building'
      },
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
    pictures: [/*
      {
        src: `https://loremflickr.com/248/152?random=${Math.random()}`,
        description: 'Local views of San Francisco'
      }
    */]
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
    offers: []
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

const points = [
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T19:55:56.845Z',
    dateTo: '2019-07-11T09:20:13.375Z',
    destination: 2,
    isFavorite: false,
    offers: [],
    type: 'taxi'
  },
  {
    basePrice: 2000,
    dateFrom: '2020-07-12T20:50:56.845Z',
    dateTo: '2020-07-13T11:21:13.375Z',
    destination: 0,
    isFavorite: true,
    offers: [1, 3, 4, 5, 6],
    type: 'bus',
  },
  {
    basePrice: 3000,
    dateFrom: '2023-01-16T21:55:56.845Z',
    dateTo: '2023-01-18T12:22:13.375Z',
    destination: 1,
    isFavorite: false,
    offers:[3, 4, 6],
    type: 'train'
  },
  {
    basePrice: 4500,
    dateFrom: '2024-07-14T22:55:56.845Z',
    dateTo: '2024-07-15T12:23:13.375Z',
    destination: 0,
    isFavorite: true,
    offers: [3, 4, 6],
    type: 'ship'
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)};
}

export { getRandomPoint, offersByType, destinations };
