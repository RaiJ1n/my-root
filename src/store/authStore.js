import { ref } from "vue";

const isAuthenticated = ref(!!localStorage.getItem("jwt")); // check on load

export function useAuth() {
  // ✅ Save token to localStorage
  const login = (token) => {
    localStorage.setItem("jwt", token);
    isAuthenticated.value = true;
  };

  // ✅ Remove token from localStorage
  const logout = () => {
    localStorage.removeItem("jwt");
    isAuthenticated.value = false;
  };

  // ✅ Check if token exists in localStorage
  const checkAuth = () => {
    isAuthenticated.value = !!localStorage.getItem("jwt");
  };

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
}
