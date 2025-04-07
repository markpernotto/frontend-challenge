import Flags from "./components/Flags";
import useCountries from "./utilities/useCountries";

export default function App() {
  const { data, error, isLoading } =
    useCountries();
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Flags flags={data?.data ?? undefined} />
    </>
  );
}
