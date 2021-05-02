import React, { useState, useEffect } from "react";
import "./App.scss";

import Cities from "../Cities/Cities";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";
import Stats from "../Stats/Stats";
import Bank from "../Bank/Bank";
import { useAppLogic } from "../hooks/useAppLogic";

import { goods } from "../../config";

function App() {
  const {
    currentCity,
    setCurrentCity,
    getCurrentStorage,
    playerStorages,
    selectedGood,
    sellGoods,
    setSelectedGood,
    getSelectedProductPrice,
    transportOrders,
    acceptOrder,
    days,
    money,
    deposits,
    cityStorages,
    buyGoods,
    createTransportOrder,
    openDeposit,
  } = useAppLogic();

  return (
    <div className="app">
      <h1 className="app-name">Деревенский трейдер</h1>

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
              storage={getCurrentStorage(playerStorages)}
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
            <Bank
              deposits={deposits}
              onOpenDeposit={openDeposit}
              money={money}
            />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage
              storage={getCurrentStorage(cityStorages)}
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
