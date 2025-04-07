import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import CountryDetail from "./components/Country";
import ExploreCountries from "./components/ExploreCountries";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
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
