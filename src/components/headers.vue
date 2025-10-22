<template>
  <header
    class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md border-b border-green-100 z-50 flex justify-between items-center px-8 py-4"
  >
    <!-- ✅ Logo -->
    <h1
      class="text-3xl font-bold text-green-700 cursor-pointer hover:text-green-800 transition"
      @click="$router.push('/')"
    >
      MyRoots
    </h1>

    <!-- ✅ Navigation & Profile -->
    <div class="flex items-center gap-5">
      <!-- Name (hidden on mobile for cleaner layout) -->
      <span class="hidden sm:block font-semibold text-green-800">
        {{ profile.name || 'Guest User' }}
      </span>


      <!-- Avatar -->
      <img
        :src="profile.avatar || defaultAvatar"
        alt="Avatar"
        class="w-12 h-12 rounded-full cursor-pointer ring-2 ring-green-400 hover:scale-105 transition"
        @click="$router.push('/profile')"
      />


      <!-- Logout -->
      <button
        @click="logout"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProfile } from '@/store/profileStore.js'
import { useAuth } from '@/store/authStore.js'

const { profile } = useProfile()
const { setAuth } = useAuth()
const router = useRouter()

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/64/64572.png'

const logout = () => {
  setAuth(false)
  localStorage.removeItem('profile')
  router.push('/login')
}

const openPostModal = () => {
  window.dispatchEvent(new CustomEvent('open-post-modal'))
}
</script>
