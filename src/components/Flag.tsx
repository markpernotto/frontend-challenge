import { Link } from "react-router-dom";
import { FlagProps } from "../utilities/interface";
import styles from "./components.module.css";
const Flag = ({ country }: FlagProps) => {
  return (
    <Link
      to={country.name}
      className={styles.flag_container}
    >
      <img
        src={country.href.flag}
        alt={country.name}
        className={styles.flag_image}
      />
      <div className={styles.flag_country_data}>
        <h3 className={styles.flag_country_name}>
          {country.name}
        </h3>
        <div>
          <strong>Capital: </strong>{" "}
          {country.capital}
          <br />
          <strong>Population: </strong>{" "}
          {country.population}
          <br />
          <strong>Region: </strong>{" "}
          {country.continent}
        </div>
      </div>
    </Link>
  );
};

export default Flag;
