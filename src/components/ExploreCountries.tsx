import useCountries from "../hooks/useCountries";
import Flags from "./Flags";

export default function ExploreCountries() {
  const { data, error, isLoading } =
    useCountries();
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <main>
      <div>SEARCHBAR</div>
      <div>DROPDOWN</div>
      <Flags flags={data?.data} />
    </main>
  );
}
