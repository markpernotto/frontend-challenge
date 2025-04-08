import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { FullCountry } from "../utilities/interface";
import useCountries from "../hooks/useCountries";
import Flags from "./Flags";
import styles from "./components.module.css";

export default function ExploreCountries() {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data,
    error,
    isLoading: loadingData,
  } = useCountries(
    pageNumber < 2
      ? "?per_page=12"
      : `?per_page=12&page=${pageNumber}`,
  );
  const [imagesLoaded, setImagesLoaded] =
    useState(false);

  useEffect(() => {
    if (data?.data) {
      const imagePromises = data.data.map(
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
  }, [data]);

  const isLoading = loadingData || !imagesLoaded;
  const [allCountries, setAllCountries] =
    useState<FullCountry[]>([]);
  const observerRef = useRef(null);

  useEffect(() => {
    if (data?.data) {
      setAllCountries((prev) => [
        ...prev,
        ...data.data,
      ]);
    }
  }, [data]);

  const loadNextPage = useCallback(() => {
    if (
      !isLoading &&
      data?.data?.length &&
      pageNumber <
        (data?.meta.last_page ?? Infinity) &&
      data?.meta.current_page === pageNumber &&
      imagesLoaded
    ) {
      setPageNumber((prev) => prev + 1);
    }
  }, [data, imagesLoaded, isLoading, pageNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    const currentObserver = observerRef.current;
    if (currentObserver)
      observer.observe(currentObserver);

    return () => {
      if (currentObserver)
        observer.unobserve(currentObserver);
    };
  }, [loadNextPage]);

  return (
    <main className={styles.main_container}>
      <div>SEARCHBAR</div>
      <div>DROPDOWN</div>
      {allCountries &&
        allCountries.length > 0 &&
        imagesLoaded && (
          <Flags flags={allCountries} />
        )}
      {(isLoading ||
        (!imagesLoaded && !allCountries)) && (
        <div>Loading...</div>
      )}
      {allCountries.length === 0 &&
        !isLoading && (
          <div>No countries found</div>
        )}
      {error && (
        <div>Error loading countries</div>
      )}
      <div
        ref={observerRef}
        style={{ height: "1px" }}
      />
    </main>
  );
}
