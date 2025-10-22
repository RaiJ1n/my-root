<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-2xl shadow-md w-[700px]">
      <h1 class="text-4xl font-bold mb-6 text-center">Create your account</h1>

      <form @submit.prevent="register" class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2 text-sm">Full Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-3 border rounded-md" />
        </div>

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

        <div>
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-md">Register</button>
        </div>

        <div class="text-center mt-3">
          <p>Already have an account? <router-link to="/login" class="text-sm text-blue-500">Login</router-link></p>
        </div>
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

<style scoped></style>
