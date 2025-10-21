<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../store/authStore.js";

const email = ref("");
const password = ref("");
const router = useRouter();
const { setAuth, checkAuth } = useAuth();

checkAuth();

const login = () => {
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (storedUser && email.value === storedUser.email && password.value === storedUser.password) {
    setAuth(true, storedUser);
    alert("Login successful!");
    router.push("/");
  } else {
    alert("Invalid credentials!");
  }
};
</script>
