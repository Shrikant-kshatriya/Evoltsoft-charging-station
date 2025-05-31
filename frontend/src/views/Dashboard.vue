<script setup>
import api from '@/services/axios.js';
import StationCard from '@/components/StationCard.vue';
import StationModal from '@/components/StationModal.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const { user } = inject('user');

const router = useRouter();
const loading = ref(true);
const stations = ref([]);
const filters = ref({
  status: '',
  powerOutput: '',
  connecterType: ''
});

const showModal = ref(false);
const editingStation = ref(null);

const openAddModal = () => {
  editingStation.value = null;
  showModal.value = true;
};

const openEditModal = (station) => {
  editingStation.value = station;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const fetchStations = async () => {
  try {
    const res = await api.get('/stations');
    stations.value = res.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
  }
};

const filteredStations = computed(() => {
  return stations.value.filter(station => {
    const matchesStatus = filters.value.status === '' || station.status === filters.value.status;
    const matchesPower = filters.value.powerOutput === '' || station.powerOutput >= parseInt(filters.value.powerOutput);
    const matchesConnecter = filters.value.connecterType === '' || station.connecterType === filters.value.connecterType;
    return matchesStatus && matchesPower && matchesConnecter;
  });
});

onMounted(() => {
    setTimeout(() => {
        if (user.value === null) {
            router.push('/');
        } else {
            fetchStations();
            loading.value = false;
        }
    }, 2000); 
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Filter + Add Station -->
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          <select v-model="filters.status" class="p-3 rounded border bg-white shadow-sm focus:ring-2 focus:ring-indigo-300">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input
            v-model="filters.powerOutput"
            type="number"
            placeholder="Min Power Output (kW)"
            class="p-3 rounded border bg-white shadow-sm focus:ring-2 focus:ring-indigo-300"
          />

          <select v-model="filters.connecterType" class="p-3 rounded border bg-white shadow-sm focus:ring-2 focus:ring-indigo-300">
            <option value="">All Connectors</option>
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div>
          <button
            @click="openAddModal"
            class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <!-- Stations List -->
       <div v-if="loading" class="flex justify-center items-center h-64">
         <PulseLoader color="#4A90E2" />
       </div>
      <transition-group v-else name="fade" tag="div" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="station in filteredStations"
          :key="station._id"
          class="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
        >
          <StationCard :station="station" @edit="openEditModal(station)" :refresh="fetchStations" />
        </div>
      </transition-group>
    </div>

    <!-- Modal for add/edit -->
    <StationModal
      :visible="showModal"
      :station="editingStation"
      @close="closeModal"
      @refresh="fetchStations"
    />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
