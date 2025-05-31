<script setup>
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import api from '@/services/axios.js';

import { ref, onMounted, provide } from 'vue'

const router = useRouter();

const user = ref(null);
const logout = async () => {
  try {
    await api.get('/auth/logout');
    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
const fetchUser = async () => {
  try {
    const response = await api.get('/auth/user');
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
provide('user', {user, logout, fetchUser});

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

