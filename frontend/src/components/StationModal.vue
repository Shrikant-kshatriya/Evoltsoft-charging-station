<script setup>
import { ref, watch } from 'vue';
import FormMap from '@/components/FormMap.vue';
import api from '@/services/axios';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const props = defineProps({
  visible: Boolean,
  station: Object,
});

const emit = defineEmits(['close', 'refresh']);

const defaultForm = () => ({
  name: '',
  status: 'active',
  powerOutput: 0,
  connecterType: 'Type2',
  location: {
    type: 'Point',
    coordinates: [77.21809, 28.60683], // Delhi default
  },
});

const form = ref(defaultForm());

watch(
  () => props.station,
  (station) => {
    form.value = station ? { ...station } : defaultForm();
  },
  { immediate: true }
);

const submitForm = async () => {
  try {
    if (props.station?._id) {
      await api.patch(`/stations/${props.station._id}`, form.value);
      toast.success('Station updated successfully');
    } else {
      await api.post('/stations', form.value);
      toast.success('Station added successfully');
    }
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error(error.response?.data?.message || 'Failed to submit form');
  }
};
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-xl animate-fade-in max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6 space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ props.station ? 'Edit Charging Station' : 'Add New Charging Station' }}
        </h2>

        <div class="space-y-4">
          <!-- Station Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter station name"
            />
          </div>

          <!-- Status and Connector -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Connector Type</label>
              <select
                v-model="form.connecterType"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>
          </div>

          <!-- Power Output -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Power Output (kW)</label>
            <input
              v-model.number="form.powerOutput"
              type="number"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., 50"
            />
          </div>

          <!-- Coordinates -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Location</label>
            <FormMap v-model="form.location.coordinates" />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3 pt-2">
          <button
            @click="$emit('close')"
            class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {{ props.station ? 'Update Station' : 'Add Station' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
