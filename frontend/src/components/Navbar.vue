<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { inject } from 'vue';

const { user, logout } = inject('user');
const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<template>
  <nav class="bg-blue-100 shadow-md px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <RouterLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
      EVCharge ⚡
    </RouterLink>

    <!-- Desktop Links -->
    <div class="hidden sm:flex items-center space-x-6 text-gray-700 font-medium">
      <template v-if="!user">
        <RouterLink to="/login" class="hover:text-blue-500 transition">Login</RouterLink>
        <RouterLink to="/register" class="hover:text-blue-500 transition">Register</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/dashboard" class="hover:text-blue-500 transition">Dashboard</RouterLink>
        <RouterLink to="/map" class="hover:text-blue-500 transition">Map</RouterLink>
        <button @click="logout" class="text-red-500 hover:text-red-600 transition cursor-pointer">Logout</button>
      </template>
    </div>

    <!-- Mobile Menu Toggle -->
    <button class="sm:hidden text-gray-600 focus:outline-none" @click="toggleMobileMenu">
      <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>

  <!-- Mobile Menu -->
  <transition name="fade">
    <div v-if="isMobileMenuOpen" class="sm:hidden bg-white shadow-md px-6 py-4 space-y-3 text-gray-700 font-medium">
      <template v-if="!user">
        <RouterLink to="/login" class="block hover:text-blue-500 transition">Login</RouterLink>
        <RouterLink to="/register" class="block hover:text-blue-500 transition">Register</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/dashboard" class="block hover:text-blue-500 transition">Dashboard</RouterLink>
        <RouterLink to="/map" class="block hover:text-blue-500 transition">Map</RouterLink>
        <button @click="logout" class="block text-left text-red-500 hover:text-red-600 transition">Logout</button>
      </template>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
