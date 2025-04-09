import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import CountryDetail from "./components/Country";
import ExploreCountries from "./components/ExploreCountries";
import Navigation from "./components/Navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

export default function App() {
  const [
    initialDarkModeCheck,
    setInitialDarkModeCheck,
  ] = useState(false);

  const userPrefersDarkMode =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

  useEffect(() => {
    if (!initialDarkModeCheck) {
      setInitialDarkModeCheck((prev) => !prev);
      if (userPrefersDarkMode) {
        document.body.classList.add("dark-mode");
      }
    }
  }, [initialDarkModeCheck, userPrefersDarkMode]);

  const [isDarkMode, setIsDarkMode] = useState(
    userPrefersDarkMode,
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(
      (previousDarkModePreference) =>
        !previousDarkModePreference,
    );
    document.body.classList.toggle("dark-mode");
  }, []);

  return (
    <BrowserRouter>
      <Navigation
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ExploreCountries
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/:country"
          element={
            <CountryDetail
              isDarkMode={isDarkMode}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
