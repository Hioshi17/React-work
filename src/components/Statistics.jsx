import React from "react";
import styles from "../styles/Statistics.module.scss";

const Statistics = ({ ageGroups, genderGroups }) => {
  return (
    <div className={styles.statistics}>
      <div>
        <h3>Age Groups</h3>
        {Object.entries(ageGroups).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
      <div>
        <h3>Gender Groups</h3>
        {Object.entries(genderGroups).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
