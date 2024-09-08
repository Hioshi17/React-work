import React from "react";
import styles from "./UserCard.module.scss";

const UserCard = ({ user, onDeleteUser }) => {
  return (
    <div className={styles.userCard}>
      <img
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <h2>{`${user.name.first} ${user.name.last}`}</h2>
      <p>Почта: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <button onClick={() => onDeleteUser(user.login.uuid)}>Удалить</button>
    </div>
  );
};

export default UserCard;
