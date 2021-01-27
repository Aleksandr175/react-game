import React, { useState } from "react";
import "./Storage.scss";

function Storage(props) {
  const [qty, setQty] = useState("");

  function findGoodById(itemId) {
    return props.goods.find((item) => {
      return item.id === itemId;
    }).title;
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
          <div className="sell-panel">
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
                  props.onSell(props.selectedGood, qty);
                }}
              >
                Продать
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Storage;
