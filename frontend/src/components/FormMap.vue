<script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [72.8777, 19.0760], // Default to Mumbai
  },
});

const emit = defineEmits(['update:modelValue']);

const mapRef = ref(null);
const currentCoordinates = ref([...props.modelValue]);
const selectedCoordinates = ref([...props.modelValue]);

let map;
let marker;

const initializeMap = () => {
  map = L.map(mapRef.value).setView([selectedCoordinates.value[1], selectedCoordinates.value[0]], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  marker = L.marker([selectedCoordinates.value[1], selectedCoordinates.value[0]], {
    draggable: true,
  }).addTo(map);

  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    selectedCoordinates.value = [pos.lng, pos.lat];
  });

  map.on('click', (e) => {
    selectedCoordinates.value = [e.latlng.lng, e.latlng.lat];
    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
  });
};

onMounted(() => {
  initializeMap();
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal || newVal.length !== 2) return;

    currentCoordinates.value = [...newVal];
    selectedCoordinates.value = [...newVal];

    if (marker && map) {
      marker.setLatLng([newVal[1], newVal[0]]);
      map.setView([newVal[1], newVal[0]], map.getZoom());
    }
  }
);

function commitCoordinates() {
  currentCoordinates.value = [...selectedCoordinates.value];
  emit('update:modelValue', [...selectedCoordinates.value]);
}

function goToUserLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { longitude, latitude } = position.coords;
      selectedCoordinates.value = [longitude, latitude];
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], 15);
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Could not retrieve location. Please allow location access.');
    }
  );
}
</script>

<template>
  <div class="h-64 rounded-lg overflow-hidden relative">
    <div ref="mapRef" class="h-full w-full z-0"></div>

    <!-- Coordinates Display -->
    <div
      v-if="selectedCoordinates"
      class="absolute top-3 right-3 bg-white/90 text-sm px-3 py-1.5 rounded shadow text-gray-700"
    >
      <p><strong>Lng:</strong> {{ selectedCoordinates[0]?.toFixed(5) }}</p>
      <p><strong>Lat:</strong> {{ selectedCoordinates[1]?.toFixed(5) }}</p>
    </div>

    <!-- Action Buttons -->
    <div class="absolute bottom-3 left-3 flex flex-col gap-2">
      <button
        @click="goToUserLocation"
        class="bg-blue-600 text-white text-sm px-3 py-1.5 rounded shadow hover:bg-blue-700 transition"
      >
        Use My Location
      </button>
      <button
        @click="commitCoordinates"
        class="bg-green-600 text-white text-sm px-3 py-1.5 rounded shadow hover:bg-green-700 transition"
      >
        Save Location
      </button>
    </div>
  </div>
</template>

<style scoped>
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>
