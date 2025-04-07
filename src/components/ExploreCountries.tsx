import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { FullCountry } from "../utilities/interface";
import useCountries from "../hooks/useCountries";
import Flags from "./Flags";

export default function ExploreCountries() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading } = useCountries(
    pageNumber < 2
      ? "?per_page=12"
      : `?per_page=12&page=${pageNumber}`,
  );
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
      data?.meta.current_page === pageNumber
    ) {
      setPageNumber((prev) => prev + 1);
    }
  }, [data, isLoading, pageNumber]);

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

  if (error) return <div>Error loading data</div>;

  return (
    <main>
      <div>SEARCHBAR</div>
      <div>DROPDOWN</div>
      <Flags flags={allCountries} />
      {isLoading && <div>Loading...</div>}
      <div
        ref={observerRef}
        style={{ height: "1px" }}
      />
    </main>
  );
}
