import "./CityStorage.scss";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function CityStorage(props) {
  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,

    tooltips: {
      mode: "index",
      intersect: false,
      caretSize: 3,

      backgroundColor: "#44200c",
      bodyFontColor: "#a68156",
      borderColor: "#877f72",
      borderWidth: 1,
      displayColors: false,

      callbacks: {
        title() {
          return "";
        },
      },
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  let [number, setNumber] = useState(0);

  function getGoodData(priceStats) {
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Цена за шт.",
          data: priceStats,
          fill: false,
          backgroundColor: "#a68156",
          borderColor: "rgba(166, 129, 86, 0.2)",
        },
      ],
    };
  }

  return (
    <div>
      <h2 className="title">Городской склад</h2>

      <div className="panel">
        <div className="city-goods">
          {props.storage.map((good) => {
            return (
              <div className="good-item-wrapper">
                <div className="good-item-description">
                  <div className={"good-item item-" + good.id} />

                  <input
                    className="input-number"
                    name="count"
                    autoComplete={false}
                    value={number}
                    maxLength={3}
                    onChange={(e) => {
                      setNumber(e.currentTarget.value);
                    }}
                  />

                  <button
                    className="button"
                    onClick={() => {
                      props.onBuy(
                        good.id,
                        number,
                        good.priceStats[good.priceStats.length - 1]
                      );
                      setNumber(0);
                    }}
                  >
                    Купить
                  </button>

                  <p className="price-description">
                    {good.priceStats[good.priceStats.length - 1]} за шт.
                  </p>
                </div>
                <div className="good-item-stats">
                  <Line data={getGoodData(good.priceStats)} options={options} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CityStorage;
