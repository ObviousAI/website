import React, { useEffect, useState } from "react";
import styles from "../styles/Logo.module.css";

export const Logo = () => {
  const words = ["Style.", "Vibe.", "Look.", "Mood."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [words.length]);

  return (
    <div className={styles.logo}>
      <div className={styles.ShopMy}>ShopMy</div>
      <div className={styles.styleContainer}> {words[currentWordIndex]} </div>
    </div>
  );
};

export default Logo;
