<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Register</h1>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Register
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  // Save user for later login
  localStorage.setItem('userData', JSON.stringify(newUser))

  alert('Registration successful! Please log in.')

  // push to login page
  router.push('/login')
}
</script>
