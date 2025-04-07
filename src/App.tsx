import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import CountryDetail from "./components/Country";
import ExploreCountries from "./components/ExploreCountries";

export default function App() {
  // const { data, error, isLoading } =
  //   useCountries();
  // if (error) return <div>Error loading data</div>;
  // if (isLoading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ExploreCountries />}
        />
        <Route
          path="/:country"
          element={<CountryDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}
