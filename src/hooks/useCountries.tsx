import useSWR from "swr";
import { AllCountries } from "../utilities/interface";
import fetcher from "../utilities/fetcher";

export default function useCountries(
  filter?: string,
) {
  return useSWR<
    AllCountries,
    Error,
    [string, string]
  >(
    [
      `${
        import.meta.env
          .VITE_RESTFULCOUNTRIES_URL as string
      }countries${filter ?? ""}`,
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
