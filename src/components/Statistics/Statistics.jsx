import React from "react";
import styles from "./Statistics.module.scss";

const Statistics = ({ users }) => {
  const calculateAgeGroups = () => {
    const ageGroups = { young: 0, adult: 0, senior: 0 };
    users.forEach((user) => {
      const age = user.dob.age;
      if (age < 30) ageGroups.young++;
      else if (age < 50) ageGroups.adult++;
      else ageGroups.senior++;
    });
    return ageGroups;
  };

  const calculateGenderGroups = () => {
    const genders = { male: 0, female: 0 };
    users.forEach((user) => {
      genders[user.gender]++;
    });
    return genders;
  };

  const ageGroups = calculateAgeGroups();
  const genderGroups = calculateGenderGroups();

  return (
    <div className={styles.statistics}>
      <h2>Статистика</h2>
      <div>
        <p>Молодые: {ageGroups.young}</p>
        <p>Взрослые: {ageGroups.adult}</p>
        <p>Пожилые: {ageGroups.senior}</p>
      </div>
      <div>
        <p>Мужчины: {genderGroups.male}</p>
        <p>Женщины: {genderGroups.female}</p>
      </div>
    </div>
  );
};

export default Statistics;
