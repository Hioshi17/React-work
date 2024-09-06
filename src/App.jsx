import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import Statistics from "./components/Statistics";
import Filters from "./components/Filters";
import styles from "./styles/App.module.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ageGroups, setAgeGroups] = useState({});
  const [genderGroups, setGenderGroups] = useState({});
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
  });

  useEffect(() => {
    // fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, users]);

  const fetchUsers = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=500");
    const usersData = response.data.results;
    setUsers(usersData);
    setFilteredUsers(usersData);
    calculateStatistics(usersData);
  };

  const calculateStatistics = (users) => {
    const ageGroups = users.reduce((acc, user) => {
      const age =
        new Date().getFullYear() - new Date(user.dob.date).getFullYear();
      if (age < 18) acc["0-18"] = (acc["0-18"] || 0) + 1;
      else if (age < 36) acc["18-36"] = (acc["18-36"] || 0) + 1;
      else if (age < 54) acc["36-54"] = (acc["36-54"] || 0) + 1;
      else acc["54+"] = (acc["54+"] || 0) + 1;
      return acc;
    }, {});

    const genderGroups = users.reduce((acc, user) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});

    setAgeGroups(ageGroups);
    setGenderGroups(genderGroups);
  };

  const handleSearch = (query) => {
    const filtered = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(query.toLowerCase()) ||
        user.name.last.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.includes(query) ||
        user.dob.date.includes(query) ||
        user.location.city.toLowerCase().includes(query.toLowerCase()) ||
        user.location.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = (uuid) => {
    const updatedUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    calculateStatistics(updatedUsers);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const applyFilters = () => {
    let filtered = users;

    if (filters.age) {
      const [minAge, maxAge] = filters.age.split("-").map(Number);
      filtered = filtered.filter((user) => {
        const age =
          new Date().getFullYear() - new Date(user.dob.date).getFullYear();
        return age >= minAge && age <= (maxAge || Infinity);
      });
    }

    if (filters.gender) {
      filtered = filtered.filter((user) => user.gender === filters.gender);
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>User List</h1>
        <button onClick={fetchUsers}>Refresh Page</button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} />
      <Statistics ageGroups={ageGroups} genderGroups={genderGroups} />
      <UserList users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
};

export default App;
