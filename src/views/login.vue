<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-2xl shadow-md w-[700px]">
      <h1 class="text-4xl font-bold mb-6 text-center">Welcome back</h1>
      
      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2 text-sm">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-3 border rounded-md" />
        </div>

        <div>
          <label class="block text-gray-700 mb-2 text-sm">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border rounded-md"
          />
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <div class="text-center mt-3">
          <p>
            Don't have an account?
            <router-link to="/register" class="text-sm text-blue-500">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/store/authStore.js"
import { useProfile } from "@/store/profileStore.js"

const email = ref("")
const password = ref("")
const router = useRouter()
const { setAuth, checkAuth } = useAuth()
const { saveProfile } = useProfile()  // ✅ NEW

checkAuth()

const login = () => {
  const storedUser = JSON.parse(localStorage.getItem("userData") || "null")

  if (storedUser && email.value === storedUser.email && password.value === storedUser.password) {
    // Update Auth Store
    setAuth(true, storedUser)

    // Sync to Profile Store (auto-fill name and email)
    saveProfile({
      name: storedUser.name || "User",
      email: storedUser.email || "",
      bio: "Tell us about your roots 🌿",
      avatar: storedUser.avatar || "",
    })

    alert("Login successful!")
    router.push("/")
  } else {
    alert("Invalid credentials!")
  }
}
</script>
