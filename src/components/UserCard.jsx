import React from "react";
import styles from "../styles/UserCard.module.scss";

const UserCard = ({ user, onDelete }) => {
  return (
    <div className={styles.card}>
      <img src={user.picture.thumbnail} alt={user.name.first} />
      <h3>
        {user.name.first} {user.name.last}
      </h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.dob.date}</p>
      <p>
        {user.location.city}, {user.location.country}
      </p>
      <button onClick={() => onDelete(user.login.uuid)}>Delete</button>
    </div>
  );
};

export default UserCard;
