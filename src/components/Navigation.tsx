import classnames from "classnames";
import { NavigationDarkModeProps } from "../utilities/interface";
import styles from "./components.module.css";
import MoonIcon from "../assets/dark.svg";
import SunIcon from "../assets/light.svg";

const Navigation = ({
  toggleDarkMode,
  isDarkMode,
}: NavigationDarkModeProps) => (
  <header
    className={classnames(styles.navigation_bar, {
      [styles.dark_mode]: isDarkMode,
    })}
  >
    <div
      className={styles.navigation_bar_contents}
    >
      <div
        className={styles.navigation_bar_title}
      >
        <h1>Where in the world?</h1>
      </div>

      <button
        className={
          styles.navigation_bar_dark_mode_toggle
        }
        onClick={() => toggleDarkMode()}
      >
        {isDarkMode ? (
          <img
            className={
              styles.navigation_bar_sun_icon
            }
            src={SunIcon}
            title="Light Mode"
            alt="Sun Icon"
          />
        ) : (
          <img
            src={MoonIcon}
            title="Dark Mode"
            alt="Moon Icon"
          />
        )}
      </button>
    </div>
  </header>
);

export default Navigation;
