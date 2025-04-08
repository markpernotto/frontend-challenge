// This code holds helper functions for our filtering logic.

import { FullCountry } from "../utilities/interface";

export const countryRegions = (
  allCountries: FullCountry[],
) => {
  return allCountries
    ?.reduce<string[]>(
      (acc: string[], cur: FullCountry) => {
        if (
          cur.continent &&
          !acc.includes(cur.continent)
        ) {
          acc.push(cur.continent);
        }
        return acc;
      },
      [],
    )
    .sort((a, b) => a.localeCompare(b));
};

// export const filterCountries = (
//   countries: FullCountry[],
//   selectedRegion: string,
//   minPopulation: number | undefined,
//   maxPopulation: number | undefined,
//   searchTerm: string,
// ) => {
//   return countries.filter((country) => {
//     const matchesRegion =
//       selectedRegion === "all" ||
//       country.continent === selectedRegion;
//     // const matchesPopulation =
//     //   (minPopulation === undefined ||
//     //     country.population >= minPopulation) &&
//     //   (maxPopulation === undefined ||
//     //     country.population <= maxPopulation);
//     const matchesSearchTerm =
//       country.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//     return (
//       matchesRegion &&
//       matchesPopulation &&
//       matchesSearchTerm
//     );
//   });
// }
