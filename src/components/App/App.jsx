import React, { useState, useEffect } from "react";
import "./App.scss";

import Cities from "../Cities/Cities";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";
import Stats from "../Stats/Stats";
import Bank from "../Bank/Bank";

import {
  defaultCityStoragesData,
  defaultStoragesData,
  defaultDeposits,
  goods,
} from "../../config";

function App() {
  const [currentCity, setCurrentCity] = useState(1);

  const [selectedGood, setSelectedGood] = useState(1);

  const [deposits, setDeposits] = useState(defaultDeposits);

  const [storages, setStorages] = useState(defaultStoragesData);

  const [cityStorages, setCityStorages] = useState(defaultCityStoragesData);

  const [money, setMoney] = useState(1000);
  const [days, setDays] = useState(1);

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

  function sellGoods(goodId, qty, totalPrice) {
    const storagesNew = [...storages];
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
          if (storagesNew[index].storage[goodIndex].qty >= qty) {
            storagesNew[index].storage[goodIndex].qty -= qty;
            moneyNew += totalPrice;

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
          getRandomInt(goodData.maxStep + 1) * priceChangeSign;

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

  function updateDeposits() {
    setDeposits((oldDeposits) => {
      const newDeposits = [...oldDeposits];

      newDeposits.forEach((deposit, index) => {
        if (deposit.days >= 1) {
          deposit.days -= 1;
        }

        if (deposit.days === 0) {
          newDeposits.splice(index, 1);

          setMoney((oldMoney) => {
            return oldMoney + deposit.amount * 1.1;
          });
        }
      });

      return newDeposits;
    });
  }

  function liveProcess() {
    setInterval(() => {
      updateCityStorages();
      updateTransportOrders();
      updateDeposits();
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

  function getSelectedProductPrice() {
    const cityStorage = getCityStorage();

    const product = cityStorage.find((product) => {
      return product.id === selectedGood;
    });

    if (product && product.priceStats) {
      return product.priceStats[product.priceStats.length - 1];
    }

    return 0;
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
              selectedProductPrice={getSelectedProductPrice()}
              goods={goods}
              onSelectGood={(goodId) => {
                setSelectedGood(goodId);
              }}
              onSell={(id, qty, price) => {
                sellGoods(id, qty, price);
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
          <div className="deposits">
            <Bank deposits={deposits} />
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
