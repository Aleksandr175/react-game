export const defaultStoragesData = [
  {
    cityId: 1,
    storage: [
      {
        id: 1,
        qty: 10,
      },
      {
        id: 2,
        qty: 20,
      },
      {
        id: 3,
        qty: 204,
      },
      {
        id: 6,
        qty: 10,
      },
      {
        id: 7,
        qty: 2,
      },
    ],
  },
  {
    cityId: 2,
    storage: [
      {
        id: 1,
        qty: 5,
      },
    ],
  },
  {
    cityId: 3,
    storage: [],
  },
];

export const defaultCityStoragesData = [
  {
    cityId: 1,
    storage: [
      {
        id: 1,
        priceStats: [12, 13, 14, 13, 12, 13, 13],
        maxStep: 1,
        minPrice: 12,
        maxPrice: 18,
      },
      {
        id: 2,
        priceStats: [15, 16, 16, 15, 14, 13, 12],
        maxStep: 1,
        minPrice: 12,
        maxPrice: 20,
      },
      {
        id: 3,
        priceStats: [8, 9, 10, 11, 10, 9, 10, 11],
        maxStep: 1,
        minPrice: 8,
        maxPrice: 15,
      },
      {
        id: 12,
        priceStats: [15, 17, 15, 16, 18, 20, 21],
        maxStep: 2,
        minPrice: 15,
        maxPrice: 21,
      },
      {
        id: 13,
        priceStats: [20, 23, 26, 24, 27, 25, 24],
        maxStep: 3,
        minPrice: 20,
        maxPrice: 35,
      },
      {
        id: 7,
        priceStats: [30, 35, 40, 38, 37, 42, 47],
        maxStep: 5,
        minPrice: 30,
        maxPrice: 50,
      },
    ],
  },
  {
    cityId: 2,
    storage: [
      {
        id: 1,
        priceStats: [12, 13, 14, 13, 12, 13, 13],
        maxStep: 1,
        minPrice: 9,
        maxPrice: 15,
      },
      {
        id: 2,
        priceStats: [13, 14, 15, 16, 17, 18, 19],
        maxStep: 1,
        minPrice: 13,
        maxPrice: 24,
      },
      {
        id: 3,
        priceStats: [10, 11, 12, 11, 12, 13, 14],
        maxStep: 1,
        minPrice: 10,
        maxPrice: 18,
      },
      {
        id: 6,
        priceStats: [8, 7, 8, 9, 10, 9, 8],
        maxStep: 1,
        minPrice: 6,
        maxPrice: 13,
      },
      {
        id: 12,
        priceStats: [14, 15, 17, 16, 15, 17, 15],
        maxStep: 2,
        minPrice: 14,
        maxPrice: 17,
      },
      {
        id: 14,
        priceStats: [30, 35, 40, 38, 37, 40, 38],
        maxStep: 5,
        minPrice: 25,
        maxPrice: 40,
      },
    ],
  },
  {
    cityId: 3,
    storage: [
      {
        id: 1,
        priceStats: [12, 13, 14, 15, 16, 15, 14],
        maxStep: 1,
        minPrice: 10,
        maxPrice: 20,
      },
      {
        id: 6,
        priceStats: [5, 6, 7, 8, 7, 8, 9],
        maxStep: 1,
        minPrice: 5,
        maxPrice: 10,
      },
      {
        id: 13,
        priceStats: [15, 20, 25, 30, 25, 22, 21],
        maxStep: 5,
        minPrice: 15,
        maxPrice: 40,
      },
      {
        id: 14,
        priceStats: [20, 25, 22, 27, 26, 29, 30],
        maxStep: 5,
        minPrice: 20,
        maxPrice: 35,
      },
      {
        id: 7,
        priceStats: [15, 20, 25, 23, 22, 27, 28],
        maxStep: 5,
        minPrice: 15,
        maxPrice: 40,
      },
    ],
  },
];

export const defaultDeposits = [
  {
    id: 1,
    amount: 100,
    days: 10,
  },
  {
    id: 2,
    amount: 200,
    days: 20,
  },
];

export const goods = [
  {
    id: 1,
    title: "Квас",
  },
  {
    id: 2,
    title: "Молоко",
  },
  {
    id: 3,
    title: "Пшеница",
  },
  {
    id: 6,
    title: "Лук",
  },
  {
    id: 7,
    title: "Виноград",
  },
  {
    id: 12,
    title: "Лопата",
  },
  {
    id: 13,
    title: "Топор",
  },
  {
    id: 14,
    title: "Кирка",
  },
];

export const settings = {
  startMoney: 1000,
  goalMoney: 5000,
  goalDays: 100,
}

export const gameStatuses = {
  new: 1,
  fail: 2,
  win: 3,
}
