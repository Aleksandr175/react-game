import "./Cities.scss";
import { cities } from "../../cities";

function Cities(props) {
  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <a
            className={
              "city " + (props.currentCity === city.id ? "active" : "")
            }
            href="#"
            onClick={() => {
              props.onChange(city.id);
            }}
          >
            {city.title}
          </a>
        );
      })}
    </div>
  );
}

export default Cities;
