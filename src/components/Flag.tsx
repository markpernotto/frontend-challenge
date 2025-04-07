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
      <h3>{country.name}</h3>
      <div>
        <strong>Population: </strong>{" "}
        {country.population}
        <strong>Region: </strong>{" "}
        {country.continent}
        <strong>Capital: </strong>{" "}
        {country.capital}
      </div>
    </Link>
  );
};

export default Flag;
