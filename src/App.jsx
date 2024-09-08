import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUsers } from "./api/userService";
import SearchBar from "./components/SearchBar/SearchBar";
import Filters from "./components/Filters/Filters";
import Statistics from "./components/Statistics/Statistics";
import UserList from "./components/UserList/UserList";
import Header from "./components/Header/Header";
import "./styles/global.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Добавим состояние для ошибок

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // Сброс ошибки перед новым запросом
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    }
    setLoading(false);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          user.email.includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    }
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = filteredUsers.filter(
      (user) => user.login.uuid !== userId
    );
    setFilteredUsers(updatedUsers);
  };

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Filters />
      <Statistics users={filteredUsers} />
      {error && <p className="error">{error}</p>} {/* Сообщение об ошибке */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
      )}
    </div>
  );
};

export default App;
