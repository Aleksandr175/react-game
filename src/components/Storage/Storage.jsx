import "./Storage.css";

function Storage(props) {
  function findGoodById(itemId) {
    return props.goods.find((item) => {
      return item.id === itemId;
    }).title;
  }

  return (
    <>
      {props.storage.map((item) => {
        return (
          <span>
            {item.id}. {findGoodById(item.id)} - {item.qty} шт.
            <br />
          </span>
        );
      })}
      Склад
    </>
  );
}

export default Storage;
