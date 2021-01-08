import React, { useState } from "react";
import "./Storage.scss";

function Storage(props) {
  const [qty, setQty] = useState("");

  function findGoodById(itemId) {
    return props.goods.find((item) => {
      return item.id === itemId;
    }).title;
  }

  function getEmptyCells() {
    if (props.storage.length < 8) {
      return Array(8 - props.storage.length)
        .fill()
        .map(() => {
          return (
            <li
              className="good-item no-item"
              key={"empty-cell-" + (8 - props.storage.length)}
            ></li>
          );
        });
    }
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {props.storage.map((item) => {
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
          })}

          {getEmptyCells()}
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
