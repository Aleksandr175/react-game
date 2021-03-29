import "./CityStorage.scss";
import React from "react";
import { Line } from "react-chartjs-2";
import StorageItem from "./components/StorageItem";

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

      backgroundColor: "#8d6048",
      bodyFontColor: "#d6ba7a",
      borderColor: "#8d6048",
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
            stepSize: 1,
            beginAtZero: false,
            fontColor: "#d6ba7a",
            fontSize: 10,
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

  function getGoodData(priceStats) {
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Цена за шт.",
          data: priceStats,
          fill: false,
          backgroundColor: "#8d6048",
          borderColor: "#8d604844",
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
              <div key={"storage-item" + good.id} className="good-item-wrapper">
                <StorageItem good={good} onBuy={props.onBuy} />
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
