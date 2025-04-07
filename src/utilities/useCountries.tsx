import useSWR from "swr";
import { AllCountries } from "./interface";
import fetcher from "./fetcher";

export default function useCountries() {
  return useSWR<
    AllCountries,
    Error,
    [string, string]
  >(
    [
      "https://restfulcountries.com/api/v1/countries?fetch_type=slim",
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
