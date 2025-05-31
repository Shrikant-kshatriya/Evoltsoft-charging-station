<script setup>
import api from '@/services/axios.js';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

defineEmits(['edit']);

const props = defineProps({
  station: {
    type: Object,
    required: true
  },
  refresh: {
    type: Function,
    required: true
  }
});

const deleteStation = async (id) => {
  try {
    await api.delete(`/stations/${id}`);
    props.refresh();
    toast.success('Station deleted successfully');
  } catch (error) {
    console.error('Error deleting station:', error);
    toast.error('Failed to delete station');
  }
};
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-1">{{ station.name }}</h3>
      <p class="text-sm text-gray-500 mb-3">
        <span class="font-medium text-gray-600">Coords:</span>
        {{ station.location?.coordinates?.join(', ') || 'N/A' }}
      </p>

      <div class="space-y-1 text-md text-gray-700">
        <p class="capitalize">
          <strong>Status: </strong>
          <span :class="station.status === 'active' ? 'text-green-600' : 'text-red-500'">
            {{ station.status }}
          </span>
        </p>
        <p><strong>Power Output:</strong> {{ station.powerOutput }} kW</p>
        <p><strong>Connector:</strong> {{ station.connecterType }}</p>
      </div>
    </div>

    <div class="mt-4 flex justify-end gap-4 text-md">
      <button
        @click="$emit('edit', station)"
        class="text-blue-600 hover:text-blue-800 font-medium transition cursor-pointer"
      >
        Edit
      </button>
      <button
        @click="() => deleteStation(station._id)"
        class="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
      >
        Delete
      </button>
    </div>
  </div>
</template>
