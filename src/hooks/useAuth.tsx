const useAuth = () => {
  const user = localStorage.getItem('authToken');
  if (user) {
    return true;
  }
  return false;
};

export default useAuth;
