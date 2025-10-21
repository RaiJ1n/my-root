import { ref, reactive } from "vue";

const isAuthenticated = ref(false);
const user = reactive({
  name: "",
  email: "",
});

export function useAuth() {
  //  Save auth and user data to localStorage reactively
  const setAuth = (status, userData = null) => {
    isAuthenticated.value = status;

    if (status && userData) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      user.name = userData.name;
      user.email = userData.email;
    } else {
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("userData");
      user.name = "";
      user.email = "";
    }
  };

  //  Get (reactively) user data and auth state from localStorage
  const checkAuth = () => {
    const storedStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    isAuthenticated.value = storedStatus;
    if (storedUser) {
      user.name = storedUser.name;
      user.email = storedUser.email;
    }
  };

  return {
    isAuthenticated,
    user,
    setAuth,
    checkAuth,
  };
}
