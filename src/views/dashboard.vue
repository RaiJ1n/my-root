<template>
  <div class="min-h-screen bg-green-50 pt-28 pb-16">
    <Headers />

    <div class="text-center mb-10">
      <h1 class="text-5xl font-extrabold text-green-800 drop-shadow-md">MyRoots Timeline</h1>
      <p class="text-lg text-green-700 mt-2">Share your family's stories 🌿</p>
    </div>

    <!-- Post Button -->
    <div class="w-full flex justify-center mb-8">
      <button
        @click="openModal = true"
        class="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        Create New Post
      </button>
    </div>
    
      <!-- Posts List -->
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="bg-white rounded-3xl shadow-2xl p-8 mx-auto w-full max-w-4xl transition transform hover:scale-[1.01] hover:shadow-green-300 duration-300 mb-8"
    >
      <div class="flex items-center mb-6">
        <img
          :src="post.avatar || profile.avatar || defaultAvatar"
          @click="$router.push('/profile')"
          class="w-16 h-16 rounded-full mr-4 cursor-pointer ring-4 ring-green-200 hover:scale-105 transition object-cover"
        />
        <div>
          <h2 class="text-2xl font-semibold text-green-900">{{ post.name || profile.name }}</h2>
          <p class="text-sm text-gray-500">{{ post.date }}</p>
        </div>
      </div>

      <p class="mb-5 text-lg leading-relaxed text-gray-700">{{ post.story }}</p>

      <div v-if="post.image" class="mb-6">
        <img :src="post.image" alt="Post" class="w-full rounded-2xl object-cover shadow-md" />
      </div>

      <div class="flex items-center justify-between">
        <button
          @click="toggleLike(index)"
          class="flex items-center gap-3 text-green-700 hover:text-green-900 transition text-xl font-medium"
        >
          <span v-if="post.liked">🌲</span>
          <span v-else>🌳</span>
          <span>{{ post.likes }} likes</span>
        </button>

        <button class="text-green-700 hover:text-green-900 text-lg font-semibold">
          💬 Comment
        </button>
      </div>
    </div>

    <!-- Post Modal -->
    <Modal :show="openModal" @toggleBackdrop="openModal = false">
      <template #modal-header>
        <h3 class="text-xl font-semibold">Create Ancestry Post</h3>
      </template>

      <template #modal-content>
        <form @submit.prevent="addPost" class="space-y-4">
          <div>
            <label class="block text-sm mb-1">Name</label>
            <input
              v-model="newPost.name"
              type="text"
              placeholder="Your name"
              class="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label class="block text-sm mb-1">Story</label>
            <textarea
              v-model="newPost.story"
              rows="6"
              required
              class="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label class="block text-sm mb-1">Image</label>
            <input type="file" accept="image/*" @change="handleFileUpload" />
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="openModal = false" class="px-4 py-2 rounded bg-gray-300">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded bg-green-600 text-white">Post</button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Headers from '../components/headers.vue'
import Modal from '../components/modal.vue'
import { useProfile } from '@/store/profileStore.js'

const { profile, loadProfile } = useProfile()
loadProfile()

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/64/64572.png'

const posts = ref([
  {
    story: 'My grandmother’s story of planting rice every summer 🌾',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    avatar: '',
    date: 'October 21, 2025',
    likes: 34,
    liked: false,
  },
  {
    name: 'John Russel Orias',
    story: 'Our family reunion where four generations gathered ❤️',
    image:
      'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=80',
    avatar: '',
    date: 'October 18, 2025',
    likes: 42,
    liked: true,
  },
])

const toggleLike = (index) => {
  const post = posts.value[index]
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const openModal = ref(false)
const newPost = ref({ name: '', story: '', image: null })

// autofill name when modal opens 
watch(openModal, (isOpen) => {
  if (isOpen) {
    // ensure profile is loaded then autofill name
    newPost.value.name = profile.name || ''
  }
})


const onOpenPost = () => {
  openModal.value = true
}
onMounted(() => {
  window.addEventListener('open-post-modal', onOpenPost)
})
onBeforeUnmount(() => {
  window.removeEventListener('open-post-modal', onOpenPost)
})

const handleFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    newPost.value.image = ev.target.result
  }
  reader.readAsDataURL(file)
}

const addPost = () => {
  const post = {
    name: newPost.value.name || profile.name || 'Anonymous',
    story: newPost.value.story || '',
    image: newPost.value.image || '',
    avatar: profile.avatar || '',
    date: new Date().toLocaleDateString(),
    likes: 0,
    liked: false,
  }
  posts.value.unshift(post)
  newPost.value = { name: '', story: '', image: null }
  openModal.value = false
}
</script>


