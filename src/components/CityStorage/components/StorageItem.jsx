import React, { useState } from "react";

function StorageItem(props) {
  let [number, setNumber] = useState("");

  return (
    <div className="good-item-description">
      <div className={"good-item item-" + props.good.id} />

      <input
        className="input-number"
        name={"count" + new Date()}
        autoComplete="new-password"
        value={number}
        maxLength={3}
        onChange={(e) => {
          setNumber(parseInt(e.currentTarget.value, 10) || "");
        }}
      />

      <button
        className="button"
        onClick={() => {
          if (number) {
            props.onBuy(
              props.good.id,
              number,
              props.good.priceStats[props.good.priceStats.length - 1]
            );
          }
          setNumber("");
        }}
      >
        Купить
      </button>

      <p className="price-description">
        {props.good.priceStats[props.good.priceStats.length - 1]} за шт.
      </p>
    </div>
  );
}

export default StorageItem;
