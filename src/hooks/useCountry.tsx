import useSWR from "swr";
import { Country } from "../utilities/interface";
import fetcher from "../utilities/fetcher";

export default function useCountry(
  country: string | undefined,
) {
  if (!country) {
    throw new Error("Country is required");
  }
  return useSWR<Country, Error, [string, string]>(
    [
      `${
        import.meta.env
          .VITE_RESTFULCOUNTRIES_URL as string
      }countries/${country}`,
      import.meta.env
        .VITE_RESTFULCOUNTRIES_TOKEN as string,
    ],
    ([url, token]) =>
      fetcher(url, token) as Promise<Country>,
  );
}
