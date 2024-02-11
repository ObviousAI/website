// TopCategories.jsx
import React from "react";
import { useRouter } from "next/router";
import styles from "../componentStyles/topSearches.module.css"; // Update the path as necessary

// const topSearches = [
//   "Something that will make me look bulky",
//   "Something that will make me look slim",
//   "Something that will make me look taller",
//   "Something that will make me look shorter",
//   "Something that will make me look more muscular",
// ];

const TopSearches = (props: { topSearches: string[] }) => {
  const router = useRouter();

  const handleSearchClick = (searchTerm: string) => {
    router.push(
      `/results?imageSearch=false&encodedeimage=null&component=false&component=$null&q=${searchTerm}`
    );
  };

  const topSearches = props.topSearches || [];

  return (
    <div className={styles.topSearchesContainer}>
      {topSearches.map((searchTerm) => (
        <button
          key={searchTerm}
          onClick={() => handleSearchClick(searchTerm)}
          className={styles.searchTermButton}
        >
          {searchTerm}
        </button>
      ))}
    </div>
  );
};

export default TopSearches;
