const getIdFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return null;
  }
  return userId;
};
export default getIdFromLocalStorage;
