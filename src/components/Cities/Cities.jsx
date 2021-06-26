import "./Cities.scss";
import { cities } from "../../cities";

function Cities(props) {
  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <span
            key={"city-" + city.id}
            className={
              "city " + (props.currentCity === city.id ? "active" : "")
            }
            onClick={() => {
              props.onChange(city.id);
            }}
          >
            {city.title}
          </span>
        );
      })}
    </div>
  );
}

export default Cities;
