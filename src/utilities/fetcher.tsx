import { AllCountries } from "./interface";

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

export default fetcher;
