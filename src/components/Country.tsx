import { useLocation } from "react-router-dom";
import useCountry from "../hooks/useCountry";

export default function CountryDetail() {
  const { pathname } = useLocation();
  const country = pathname.split("/").pop();
  const { data, error, isLoading } =
    useCountry(country);
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;

  const countryDetail = data?.data;
  return (
    <div>
      <h1>{countryDetail?.name}</h1>
      <div>
        <h3>{countryDetail?.name}</h3>
        <div>
          <p>
            Population:{" "}
            {countryDetail?.population}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
