import useSWR from "swr";
import { Country } from "./interface";
import fetcher from "./fetcher";

export default function useCountries(
  country: string,
) {
  return useSWR<Country, Error, [string, string]>(
    [
      `${
        import.meta.env
          .VITE_RESTFULCOUNTRIES_URL as string
      }${country}`,
      import.meta.env
        .VITE_RESTFULCOUNTRIES_TOKEN as string,
    ],
    ([url, token]) =>
      fetcher(url, token) as Promise<Country>,
  );
}
