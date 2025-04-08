import useSWR from "swr";
import {
  AllCountries,
  WorldRequest,
} from "../utilities/interface";
import fetcher from "../utilities/fetcher";

const decodeFilter = (
  filter?: WorldRequest,
): string => {
  if (!filter) return "";
  const {
    minPopulation,
    maxPopulation,
    regionSelected,
  } = filter;

  const filterParams = new URLSearchParams();
  if (minPopulation) {
    filterParams.append(
      "population_from",
      minPopulation.toString(),
    );
  }
  if (maxPopulation) {
    filterParams.append(
      "population_to",
      maxPopulation.toString(),
    );
  }
  if (
    regionSelected &&
    regionSelected !== "all"
  ) {
    filterParams.append(
      "continent",
      regionSelected,
    );
  }

  return `?${filterParams.toString()}`;
};

export default function useCountries(
  countryFilter?: WorldRequest,
) {
  const decodedFilterObject = decodeFilter(
    countryFilter,
  );
  return useSWR<
    AllCountries,
    Error,
    [string, string]
  >(
    [
      `${
        import.meta.env
          .VITE_RESTFULCOUNTRIES_URL as string
      }countries${decodedFilterObject ?? ""}`,
      import.meta.env
        .VITE_RESTFULCOUNTRIES_TOKEN as string,
    ],
    ([url, token]) =>
      fetcher(
        url,
        token,
      ) as Promise<AllCountries>,
  );
}
