import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { CountryDarkModeProps } from "../utilities/interface";
import useCountry from "../hooks/useCountry";
import styles from "./components.module.css";
import useCountryStates from "../hooks/useCountryStates";

export default function CountryDetail({
  isDarkMode,
}: CountryDarkModeProps) {
  const { pathname } = useLocation();
  const country = pathname.split("/").pop();
  const { data, error, isLoading } =
    useCountry(country);
  const { data: countryStatesData } =
    useCountryStates(country);
  const countryDetail = data?.data;
  const countryStates = countryStatesData?.data;
  return (
    <main
      className={classnames(
        styles.main_container,
        { [styles.dark_mode]: isDarkMode },
      )}
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      <div
        className={
          styles.country_detail_container
        }
      >
        <div
          className={
            styles.country_detail_flag_image
          }
        >
          <img
            src={countryDetail?.href.flag}
            alt={countryDetail?.name}
            className={styles.flag_image}
          />
        </div>

        <div
          className={styles.country_detail_text}
        >
          <h1>{countryDetail?.name}</h1>
          <div>
            <p>
              <strong>Official Name:</strong>{" "}
              {countryDetail?.full_name}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {countryDetail?.population}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              {countryDetail?.capital}
            </p>
            <p>
              <strong>Continent:</strong>{" "}
              {countryDetail?.continent}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {countryDetail?.size}
            </p>
            <p>
              <strong>States:</strong>{" "}
              {Array.isArray(countryStates) &&
                countryStates.length > 0 &&
                countryStates.map(
                  (
                    state: { name: string },
                    index: number,
                  ) => (
                    <span key={state.name}>
                      {state.name}
                      {index <
                      countryStates.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ),
                )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
