// pages/index.tsx
import React from "react";
import { RotatingCarousel, SearchBar } from "../components";
import styles from "../styles/App.module.css";

const App = () => {
  return (
    <div className={styles.App}>
      <SearchBar />
      <RotatingCarousel />
    </div>
  );
};

export default App;
