<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
    <!-- Hero Section -->
    <section class="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-20">
      <div class="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight animate-fade-in-down">
          Find & Power Your EV <span class="text-blue-500">Anywhere</span>
        </h2>
        <p class="text-gray-600 text-lg animate-fade-in-up delay-200">
          Explore, track, and charge your electric vehicle with the most reliable and updated EV station map.
        </p>
        <RouterLink
          to="/login"
          class="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all animate-fade-in-up delay-300"
        >
          Explore Charging Stations
        </RouterLink>
      </div>

      <div class="w-full lg:w-1/2 p-6 animate-fade-in-up delay-300">
        <img src="https://cdn-icons-png.flaticon.com/512/252/252033.png" alt="EV charging illustration" class="w-full max-w-md mx-auto" />
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 text-gray-600 text-sm">
      © {{ new Date().getFullYear() }} EVCharge. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease forwards;
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease forwards;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
</style>
