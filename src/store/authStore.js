
import { ref, reactive } from "vue"

// check authentication status from localStorage
const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true")
const user = reactive(JSON.parse(localStorage.getItem("user")) || {
  name: "",
  email: "",
})



export function useAuth() {
  const setAuth = (status, userData = null) => {
    isAuthenticated.value = status
    localStorage.setItem("isAuthenticated", status)
    if (userData) {
      Object.assign(user, userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("user")
    }
  }

  const checkAuth = () => {
    isAuthenticated.value = localStorage.getItem("isAuthenticated") === "true"
    const storedUser = localStorage.getItem("user")
    if (storedUser) Object.assign(user, JSON.parse(storedUser))
  }

  return { isAuthenticated, user, setAuth, checkAuth }
}
