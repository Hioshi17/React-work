export const getUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=500");
  const data = await response.json();
  return data.results;
};
