import React from "react";
import UserCard from "./UserCard";
import styles from "../styles/UserList.module.scss";

const UserList = ({ users, onDelete }) => {
  return (
    <div className={styles.UserList}>
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;
