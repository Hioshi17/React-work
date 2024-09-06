import React from "react";
import styles from "../styles/SearchBar.module.scss";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className={styles.searchBar}
    />
  );
};

export default SearchBar;
