import React, { useState, useEffect } from "react";
import "./App.scss";

import Cities from "../Cities/Cities";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";
import Stats from "../Stats/Stats";

function App() {
  const [currentCity, setCurrentCity] = useState(1);

  const [selectedGood, setSelectedGood] = useState(1);

  const [storages, setStorages] = useState([
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
          id: 4,
          qty: 200,
        },
        {
          id: 5,
          qty: 120,
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
  ]);

  const [cityStorages, setCityStorages] = useState([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          priceStats: [10, 15, 18, 13, 15, 18, 10],
          maxStep: 5,
          minPrice: 10,
          maxPrice: 40,
        },
        {
          id: 2,
          priceStats: [12, 13, 14, 15, 16, 11, 18],
          maxStep: 7,
          minPrice: 5,
          maxPrice: 70,
        },
        {
          id: 3,
          priceStats: [25, 28, 31, 27, 23, 20, 25],
          maxStep: 8,
          minPrice: 15,
          maxPrice: 50,
        },
      ],
    },
  ]);

  const [money, setMoney] = useState(1000);
  const [days, setDays] = useState(1);

  const goods = [
    {
      id: 1,
      title: "Пиво",
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
      id: 4,
      title: "Грибы",
    },
    {
      id: 5,
      title: "Клевер",
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
      id: 8,
      title: "Орехи",
    },
    {
      id: 9,
      title: "Вилы",
    },
    {
      id: 10,
      title: "Доски",
    },
    {
      id: 11,
      title: "Коса",
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

  const [transportOrders, setTransportOrders] = useState([]);
  const [orderId, setOrderId] = useState(1);

  function getStorageByCity() {
    const store = storages.find((storage) => {
      return storage.cityId === currentCity;
    });

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  }

  function getCityStorageByCity() {
    const store = cityStorages.find((storage) => {
      return storage.cityId === currentCity;
    });

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  }

  function sellGoods(goodId, qty) {
    const storagesNew = storages;
    let moneyNew = money;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === currentCity;
    });

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex((good) => {
        return good.id === goodId;
      });

      if (goodIndex > -1) {
        const currentCityStorage = getCityStorageByCity();

        const cityGoodIndex = currentCityStorage.findIndex((good) => {
          return good.id === goodId;
        });

        if (cityGoodIndex > -1) {
          const price =
            currentCityStorage[cityGoodIndex].priceStats[
              currentCityStorage[cityGoodIndex].priceStats.length - 1
            ];

          if (storagesNew[index].storage[goodIndex].qty >= qty) {
            storagesNew[index].storage[goodIndex].qty -= qty;
            moneyNew += qty * price;

            if (storagesNew[index].storage[goodIndex].qty === 0) {
              removeProduct(storagesNew[index].storage[goodIndex].id);
            }

            setMoney(moneyNew);
          }
        }
      }
    }

    setStorages(storagesNew);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function updateCityStorages() {
    const newCityStorages = cityStorages;

    for (let cityIndex = 0; cityIndex < newCityStorages.length; cityIndex++) {
      const storage = newCityStorages[cityIndex].storage;

      for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
        const goodData = storage[goodIndex]; // id, priceStats, maxStep, min, max price
        const priceChangeSign = getRandomInt(2) ? 1 : -1;
        const priceChangeValue =
          getRandomInt(goodData.maxStep) * priceChangeSign;

        let newPrice = goodData.priceStats.slice(-1).pop() + priceChangeValue;

        if (newPrice > goodData.maxPrice) {
          newPrice = goodData.maxPrice;
        }

        if (newPrice < goodData.minPrice) {
          newPrice = goodData.minPrice;
        }

        for (let i = 0; i < goodData.priceStats.length - 1; i++) {
          goodData.priceStats[i] = goodData.priceStats[i + 1];
        }

        goodData.priceStats[goodData.priceStats.length - 1] = newPrice;

        newCityStorages[cityIndex][goodIndex] = goodData;
      }
    }

    setCityStorages(newCityStorages);
  }

  function updateTransportOrders() {
    setTransportOrders((oldTransportOrders) => {
      const newOrders = [...oldTransportOrders];

      newOrders.forEach((order, index) => {
        if (order.days >= 1) {
          order.days -= 1;
        }
      });

      return newOrders;
    });
  }

  function liveProcess() {
    setInterval(() => {
      updateCityStorages();
      updateTransportOrders();
      setDays((days) => days + 1);
    }, 5000);
  }

  useEffect(() => {
    liveProcess();
  }, []);

  function getCityStorage() {
    const store = cityStorages.find((storage) => {
      return storage.cityId === currentCity;
    });

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  }

  function createTransportOrder(targetCityId) {
    const newOrders = [...transportOrders];

    const storage = getStorageByCity();

    const goodIndex = storage.findIndex((good) => good.id == selectedGood);

    if (goodIndex > -1) {
      newOrders.push({
        id: orderId,
        fromCityId: currentCity,
        targetCityId,
        goodId: selectedGood,
        qty: storage[goodIndex].qty,
        days: 30,
      });

      setOrderId(orderId + 1);
      removeProduct(selectedGood);
      setTransportOrders(newOrders);
    }
  }

  function removeProduct(productId) {
    const storagesNew = storages;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === currentCity;
    });

    if (index > -1) {
      const productIndex = storagesNew[index].storage.findIndex((product) => {
        return product.id === productId;
      });

      if (productIndex > -1) {
        storagesNew[index].storage.splice(productIndex, 1);
      }
    }

    setStorages(storagesNew);
  }

  function buyGoods(goodId, qty, price) {
    const totalPrice = qty * price;

    if (money >= totalPrice) {
      const storagesNew = storages;

      const index = storagesNew.findIndex((storage) => {
        return storage.cityId === currentCity;
      });

      if (index > -1) {
        const goodIndex = storagesNew[index].storage.findIndex((good) => {
          return good.id === goodId;
        });

        if (goodIndex > -1) {
          const newQty =
            parseInt(storagesNew[index].storage[goodIndex].qty) +
            parseInt(qty, 10);
          storagesNew[index].storage[goodIndex].qty = newQty;
        } else {
          storagesNew[index].storage.push({
            id: goodId,
            qty: qty,
          });
        }
      }

      setStorages(storagesNew);
      setMoney(money - totalPrice);
    }
  }

  function acceptOrder(order) {
    setTransportOrders((orders) => {
      const newOrders = [...orders];

      const index = newOrders.findIndex((o) => {
        return o.id === order.id;
      });

      if (index > -1) {
        newOrders.splice(index, 1);
      }

      return newOrders;
    });

    // update product qty in target city
    const storagesNew = storages;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === order.targetCityId;
    });

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex((good) => {
        return good.id === order.goodId;
      });

      if (goodIndex > -1) {
        storagesNew[index].storage[goodIndex].qty += order.qty;
      } else {
        storagesNew[index].storage.push({
          id: order.goodId,
          qty: order.qty,
        });
      }
    }

    setStorages(storagesNew);
  }

  return (
    <div className="app">
      <h1 className="app-name">Спекулянтик</h1>

      <Cities
        currentCity={currentCity}
        onChange={(city) => {
          setCurrentCity(city);
        }}
      />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage
              currentCity={currentCity}
              storage={getStorageByCity()}
              selectedGood={selectedGood}
              goods={goods}
              onSelectGood={(goodId) => {
                setSelectedGood(goodId);
              }}
              onSell={(id, qty) => {
                sellGoods(id, qty);
              }}
              onTransport={(targetCityId) => {
                createTransportOrder(targetCityId);
              }}
            />
          </div>
          <div className="transportations">
            <Transportations
              orders={transportOrders}
              goods={goods}
              onAcceptOrder={acceptOrder}
            />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage
              storage={getCityStorage()}
              onBuy={(goodId, number, price) => {
                buyGoods(goodId, number, price);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
