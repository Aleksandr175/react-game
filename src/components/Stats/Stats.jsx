import "./Stats.scss";

function Stats(props) {
  return (
    <div>
      <h2 className="title">Статистика</h2>

      <div className="panel stats-panel">
        <div className="money">{props.money}</div>
        <div className="days">Дни: {props.days}</div>
      </div>
    </div>
  );
}

export default Stats;
