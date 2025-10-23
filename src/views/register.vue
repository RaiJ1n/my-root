<template>
  <div class="min-h-screen flex items-center justify-center bg-green-100">
    <!-- Main Container -->
    <div class="flex w-[1200px] bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
      
      <!-- Hero Section -->
      <div
        class="w-1/2 flex flex-col items-center justify-center text-center p-10
               bg-gradient-to-br from-emerald-700 via-green-600 to-lime-400
               text-white/95 backdrop-blur-md relative overflow-hidden"
      >
        <!-- Subtle decorative glow -->
        <div class="absolute inset-0 bg-white/10 mix-blend-overlay"></div>

        <!-- Logo -->
        <img
          :src="logo"
          alt="MyRoots logo"
          class="w-56 h-56 mb-6 rounded-full shadow-2xl ring-4 ring-white/40 bg-white/10 backdrop-blur-sm"
        />

        <!-- App title -->
        <h2 class="text-3xl font-extrabold mb-3 drop-shadow-md tracking-wide">MyRoots</h2>

        <!-- Tagline -->
        <p class="text-white/90 text-lg max-w-sm leading-relaxed">
          Preserve your heritage, connect generations, and share your family's legacy 🌿
        </p>
      </div>

      <!--  Registration Form Section -->
      <div class="w-1/2 p-10 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-6 text-center text-green-900">Create your account</h1>

        <form @submit.prevent="register" class="space-y-6">
          <div>
            <label class="block text-gray-700 mb-2 text-sm">Full Name</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 border rounded-md"
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-2 text-sm">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border rounded-md"
            />
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
            <button
              type="submit"
              class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-500 transition"
            >
              Register
            </button>
          </div>

          <div class="text-center mt-3">
            <p>
              Already have an account?
              <router-link to="/login" class="text-sm text-blue-500 hover:underline">
                Login
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/image/logoMyRoots.jpg'

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

  localStorage.setItem('userData', JSON.stringify(newUser))
  alert('Registration successful!')
  router.push('/login')
}
</script>
