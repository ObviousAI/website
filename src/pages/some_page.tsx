// pages/index.tsx
import React from "react";
import { SearchBar } from "../components/SearchBar";
import { RotatingCarousel } from "../components";
import styles from "../styles/App.module.css";

const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
      <RotatingCarousel />
    </div>
  );
};

export default App;
