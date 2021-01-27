import "./Transportations.scss";

function Transportations() {
  return (
    <div className="transportations">
      <h2 className="title">Активные перевозки</h2>

      <div className="panel">
        <div className="good-item-wrapper">
          <div className="good-item-description">
            <div className={"good-item item-" + "1"} />
          </div>
          <div className="good-item-transport-info">
            <div>
              <div className="header">Пиво</div>
              <div className="path">Город 1 -> Город 2</div>
            </div>
            <div>
              <div className="days">Дни: 12</div>
              <button className="button" disabled="disabled">
                Получить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transportations;
