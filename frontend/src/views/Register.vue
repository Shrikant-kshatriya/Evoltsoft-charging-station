<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import api from '@/services/axios.js';
import { useToast } from 'vue-toast-notification';
import { inject } from 'vue';

const { user } = inject('user');

const toast = useToast();
const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');

const register = async () => {
  try {
    const response = await api.post('/auth/register', {
      email: email.value,
      username: username.value,
      password: password.value,
    });
    toast.success('Registration successful! Please log in.');
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
    toast.error('Registration failed. ' + (error.response?.data?.message || 'Please try again.'));
  }
};

onMounted(() => {
  if (user.value !== null) {
    router.push('/dashboard');
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md animate-fade-in">
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Your Account 🚀</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="you@example.com"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="username" type="text" placeholder="johndoe"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" placeholder="********"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <button @click="register"
          class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-200">
          Register
        </button>
      </div>

      <p class="mt-6 text-sm text-center text-gray-600">
        Already have an account?
        <RouterLink to="/login" class="text-indigo-500 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
