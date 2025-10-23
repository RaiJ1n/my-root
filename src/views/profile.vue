<template>
  <div class="min-h-screen bg-green-50 flex flex-col items-center pt-28">
    <div class="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg text-center">
      <img
        :src="profile.avatar || defaultAvatar"
        alt="Avatar"
        class="w-32 h-32 rounded-full mx-auto ring-4 ring-green-300 mb-4 object-cover"
      />
      <input type="file" @change="handleAvatarChange" class="mb-4" />

      <input
        v-model="local.name"
        placeholder="Full name"
        class="w-full mb-3 text-3xl font-bold text-green-800 bg-transparent border-0 text-center focus:outline-none"
      />

      <input
        v-model="local.email"
        placeholder="Email"
        class="w-full mb-3 text-gray-600 bg-transparent border-0 text-center focus:outline-none"
      />

      <textarea
        v-model="local.bio"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-green-200 mb-4"
        placeholder="Write a short bio"
      ></textarea>

      <div class="flex justify-center gap-4">
        <button
          @click="saveChanges"
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Changes
        </button>

        <button
          @click="cancel"
          class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProfile } from '@/store/profileStore.js'
import { useAuth } from '@/store/authStore.js'

const { profile, saveProfile, updateAvatar, loadProfile } = useProfile()
const { setAuth } = useAuth()
const router = useRouter()

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/64/64572.png'

// local editable copy
const local = reactive({
  name: '',
  email: '',
  bio: '',
})

// ensure profileStore is loaded 
onMounted(() => {
  loadProfile()
  local.name = profile.name || ''
  local.email = profile.email || ''
  local.bio = profile.bio || ''
})

// event handler for avatar change
const handleAvatarChange = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      updateAvatar(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

const saveChanges = () => {
  // prepare object to persist (use profile.avatar if present)
  const payload = {
    name: local.name,
    email: local.email,
    bio: local.bio,
    avatar: profile.avatar || '',
  }

  // save to profile store
  saveProfile(payload)

  // also sync with userData used for login/auth (preserve existing password)
  try {
    const stored = JSON.parse(localStorage.getItem('userData') || 'null') || {}
    const merged = { ...stored, name: payload.name, email: payload.email }
    localStorage.setItem('userData', JSON.stringify(merged))
    // update reactive auth store if used elsewhere
    setAuth(true, merged)
  } catch (err) {
    // ignore JSON errors
  }

  // reload profile to ensure reactive store matches saved data
  loadProfile()
  alert('Profile saved.')
  router.push('/')
}

const cancel = () => {
  // discard local edits and navigate back
  router.push('/')
}
</script>

<style scoped></style>
