export const useUser = () => {
  const token = localStorage.getItem("Token");
  return { token: token || null };
};
