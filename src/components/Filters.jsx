import React from "react";
import styles from "../styles/Filters.module.scss";

const Filters = ({ onFilterChange }) => {
  const handleAgeChange = (e) => {
    onFilterChange("age", e.target.value);
  };

  const handleGenderChange = (e) => {
    onFilterChange("gender", e.target.value);
  };

  return (
    <div className={styles.filters}>
      <label>
        Age Group:
        <select onChange={handleAgeChange}>
          <option value="">All</option>
          <option value="0-18">0-18</option>
          <option value="18-36">18-36</option>
          <option value="36-54">36-54</option>
          <option value="54+">54+</option>
        </select>
      </label>
      <label>
        Gender:
        <select onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
