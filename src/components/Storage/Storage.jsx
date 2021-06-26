import React, { useState } from "react";
import "./Storage.scss";
import { cities } from "../../cities";

function Storage(props) {
  const [qty, setQty] = useState("");
  const [targetCityId, setTargetCityId] = useState(1);

  function findGoodById(itemId) {
    return props.goods.find((item) => {
      return item.id === itemId;
    }).title;
  }

  function getTotalPrice() {
    return parseInt(props.selectedProductPrice * qty * 0.9, 10);
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {Array(8)
            .fill()
            .map((i, index) => {
              if (props.storage[index]) {
                const item = props.storage[index];

                return (
                  <li
                    key={"storage-item-" + item.id}
                    className={
                      "good-item item-" +
                      item.id +
                      (props.selectedGood === item.id ? " selected" : "")
                    }
                    onClick={() => {
                      props.onSelectGood(item.id);
                    }}
                  >
                    <span className="good-description">{item.qty} шт.</span>
                  </li>
                );
              } else {
                return (
                  <li
                    className="good-item no-item"
                    key={"empty-cell-" + index}
                  ></li>
                );
              }
            })}
        </ul>

        {props.selectedGood ? (
          <>
            <div className="sell-panel">
              <div className="sell-panel-content">
                <div>{findGoodById(props.selectedGood)}</div>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    maxLength={3}
                    value={qty}
                    onChange={(e) => {
                      setQty(parseInt(e.target.value, 10) || "");
                    }}
                  />{" "}
                  шт.
                  <button
                    className="button"
                    onClick={() => {
                      props.onSell(props.selectedGood, qty, getTotalPrice());
                    }}
                    disabled={!qty || !props.selectedProductPrice}
                  >
                    Продать
                  </button>
                </div>
              </div>
              {qty && props.selectedProductPrice ? (
                <div className="sell-panel-info">
                  По цене {props.selectedProductPrice} x {qty} шт, налог: 10%.
                  Итого: {getTotalPrice()}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="order-panel">
              <div>
                <select
                  className="select-city"
                  value={targetCityId}
                  onChange={(e) => {
                    setTargetCityId(parseInt(e.currentTarget.value, 10));
                  }}
                >
                  {cities.map((city) => {
                    return (
                      <option
                        key={"storage-" + city.id}
                        disabled={city.id === props.currentCity}
                        value={city.id}
                      >
                        {city.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="controls">
                <button
                  className="button"
                  onClick={() => {
                    props.onTransport(parseInt(targetCityId, 10));
                  }}
                  disabled={targetCityId === props.currentCity}
                >
                  Перевезти
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Storage;
