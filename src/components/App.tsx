// pages/index.tsx
import React from "react";

import styles from "../styles/App.module.css";

import { RotatingCarousel, SearchBar } from "../components";

const App = () => {
  return (
    <div className={styles.App}>
      <SearchBar />
      <RotatingCarousel />
    </div>
  );
};

export default App;
