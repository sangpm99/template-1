export const useStorage = (name: string) => {
  const user = localStorage.getItem("User");

  return !!user;
};
