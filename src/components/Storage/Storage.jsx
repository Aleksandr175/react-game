import "./Storage.scss";

function Storage(props) {
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
          return <li className="good-item no-item"></li>;
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
              <li className={"good-item item-" + item.id}>
                <span className="good-description">{item.qty} шт.</span>
              </li>
            );
          })}

          {getEmptyCells()}
        </ul>
      </div>
    </div>
  );
}

export default Storage;
