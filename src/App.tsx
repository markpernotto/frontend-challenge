import useSWR from "swr";
import { AllCountries } from "./utilities/interface";

const fetcher = async (
  url: string,
  token: string,
): Promise<AllCountries> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      "An error occurred while fetching the data.",
    );
  }

  return res.json() as Promise<AllCountries>;
};

export default function App() {
  const { data } = useSWR<AllCountries>(
    [
      "https://restfulcountries.com/api/v1/countries",
      import.meta.env
        .VITE_RESTFULCOUNTRIES_TOKEN as string,
    ] as [string, string],
    ([url, token]: [string, string]) =>
      fetcher(url, token),
  );
  console.log("data:", data);
  return <>THIS IS THE VERY BEGINNING</>;
}
