// import React, { useState } from "react";
// import styles from "../componentStyles/SearchBox.module.css"; // Import the CSS for styling
// import { searchBoxInput } from "../helpers"; // Import the types for the input props

// const SearchBox = (searchBoxInput: searchBoxInput) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (inputValue.trim()) {
//       onSearch(inputValue.trim());
//     }
//   };

//   const handleAttachment = (event) => {
//     console.log(event.target.files[0]);
//   };

//   return (
//     <div className={styles.searchBox}>
//       <form onSubmit={handleSubmit} className={styles.searchForm}>
//         <input
//           type="text"
//           className={styles.searchInput}
//           placeholder="Ask anything..."
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button type="submit" className={styles.searchButton}>
//           {/* Replace with an SVG or font icon for the search icon */}
//           <i className={styles.searchIcon}>🔍</i>
//         </button>
//         <button type="button" className={styles.attachButton}>
//           <label htmlFor="file-upload" className={styles.customFileUploads}>
//             <i className={styles.attachIcon}>📎</i>{" "}
//             {/* Replace with an actual attachment icon */}
//           </label>
//           <input
//             id={styles.fileId}
//             type="file"
//             onChange={handleAttachment}
//             style={{ display: "none" }}
//           />
//         </button>
//       </form>
//     </div>
//   );
// };

const SearchBox = () => {
  return (
    <div>
      <h1>SearchBox</h1>
    </div>
  );
};
export default SearchBox;
