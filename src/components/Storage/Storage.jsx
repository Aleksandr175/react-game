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
          return <li className="good-item"></li>;
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
              <li className="good-item">
                {findGoodById(item.id)}, {item.qty} шт.
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
