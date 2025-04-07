import styles from "./components.module.css";

const Navigation = () => {
  return (
    <header className={styles.navigation_bar}>
      <div
        className={styles.navigation_bar_contents}
      >
        <div
          className={styles.navigation_bar_title}
        >
          <h1>Where in the world?</h1>
        </div>
        <button className={styles.dark_mode}>
          <i className="fa-solid fa-moon"></i>
          Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Navigation;
