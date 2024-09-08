import React from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.scss";

const UserList = ({ users, onDeleteUser }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserCard
          key={user.login.uuid}
          user={user}
          onDeleteUser={onDeleteUser}
        />
      ))}
    </div>
  );
};

export default UserList;
