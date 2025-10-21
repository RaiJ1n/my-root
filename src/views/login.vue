<template>
  <div class="min-h-screen flex items-center justify-center  px-4">
    <div class="w-full max-w-md  p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-6">Login</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Email Input -->
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <!-- Password Input -->
        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p class="text-sm text-center text-gray-600 mt-2">
          Don't have an account?
          <a href="#" class="text-blue-600 hover:underline">Register</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

// Reusable reactive form state
const email = ref("");
const password = ref("");

// Emit submit event so parent can handle the data
const emit = defineEmits(["submit"]);

const submitForm = () => {
  emit("submit", { email: email.value, password: password.value });
};
</script>
