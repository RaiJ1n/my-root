<template>
  <div class="min-h-screen flex items-center justify-center  px-4">
    <div class="w-full max-w-md  p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-6">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block mb-1 font-medium">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <!-- Email -->
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

        <!-- Password -->
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

        <!-- Confirm Password -->
        <div>
          <label class="block mb-1 font-medium">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>

        <p class="text-sm text-center text-gray-600 mt-2">
          Already have an account?
          <a href="#" class="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  console.log("Name:", name.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  console.log("Confirm Password:", confirmPassword.value);

  
};
</script>
