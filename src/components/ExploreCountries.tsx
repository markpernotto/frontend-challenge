import { useState, useEffect } from "react";
import classnames from "classnames";
import {
  ExploreProps,
  FullCountry,
  WorldRequest,
} from "../utilities/interface";
import useCountries from "../hooks/useCountries";
import Flags from "./Flags";
import styles from "./components.module.css";
import { countryRegions } from "../utilities/filter";

export default function ExploreCountries({
  isDarkMode,
}: ExploreProps) {
  const [worldRequest, setWorldRequest] =
    useState<WorldRequest>({
      minPopulation: undefined,
      maxPopulation: undefined,
      regionSelected: "all",
      searchTerm: "",
    });

  const {
    data,
    error,
    isLoading: loadingData,
  } = useCountries(worldRequest);
  const [imagesLoaded, setImagesLoaded] =
    useState(false);

  const allCountries = data?.data;
  useEffect(() => {
    if (allCountries) {
      setVisibleCountries(allCountries);
    }
  }, [allCountries]);

  const [initialCountries, setInitialCountries] =
    useState<FullCountry[]>([]);

  useEffect(() => {
    if (
      allCountries &&
      initialCountries.length === 0
    ) {
      setInitialCountries(allCountries);
    }
  }, [allCountries, initialCountries]);

  const countryRegionsResults: string[] =
    countryRegions(initialCountries);

  useEffect(() => {
    if (allCountries) {
      const imagePromises = allCountries.map(
        (country: FullCountry) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = country.href.flag;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
      );
      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((error) =>
          console.error(
            "Error preloading images:",
            error,
          ),
        );
    }
  }, [allCountries]);

  const [visibleCountries, setVisibleCountries] =
    useState<FullCountry[]>(allCountries ?? []);

  const isLoading = loadingData || !imagesLoaded;

  return (
    <main className={styles.main_container}>
      <div
        className={classnames(
          styles.explore_countries_filter,
          { [styles.dark_mode]: isDarkMode },
        )}
      >
        <input
          type="text"
          placeholder="Search..."
          className={
            styles.explore_countries_filter_search
          }
          onChange={(e) => {
            const filtered = allCountries?.filter(
              (country: FullCountry) =>
                country.name
                  .toLowerCase()
                  .startsWith(
                    e.target.value.toLowerCase(),
                  ),
            );
            setVisibleCountries(filtered ?? []);
          }}
        />
        <div
          className={
            styles.explore_countries_filter_population_dropdown
          }
        >
          <div>
            <input
              placeholder={"min population"}
              type="number"
              className={
                styles.explore_countries_filter_input
              }
              onChange={(e) => {
                setWorldRequest({
                  ...worldRequest,
                  minPopulation: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                });
              }}
            />
          </div>
          <div>
            <input
              placeholder={"max population"}
              type="number"
              className={
                styles.explore_countries_filter_input
              }
              onChange={(e) => {
                setWorldRequest({
                  ...worldRequest,
                  maxPopulation: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                });
              }}
            />
          </div>
        </div>

        <select
          className={
            styles.explore_countries_filter_region_dropdown
          }
          value={
            worldRequest.regionSelected ?? "all"
          }
          onChange={(e) => {
            setWorldRequest({
              ...worldRequest,
              regionSelected: e.target.value,
            });
          }}
        >
          <option value="all">
            All Continents
          </option>

          {countryRegionsResults?.map(
            (region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ),
          )}
        </select>
      </div>
      {visibleCountries &&
        visibleCountries.length > 0 &&
        imagesLoaded && (
          <Flags flags={visibleCountries} />
        )}
      {(isLoading ||
        (!imagesLoaded && !visibleCountries)) && (
        <div>Loading...</div>
      )}
      {visibleCountries &&
        visibleCountries.length === 0 &&
        !isLoading && (
          <div>No countries found</div>
        )}
      {error && (
        <div>
          Error loading countries: {error.message}
        </div>
      )}
    </main>
  );
}
