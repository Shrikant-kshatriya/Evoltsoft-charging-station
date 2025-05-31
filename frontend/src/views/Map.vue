<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/axios.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Fix for default marker icons in production
if (typeof window !== 'undefined' && !L.Icon.Default.prototype._iconUrlFixed) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  L.Icon.Default.prototype._iconUrlFixed = true;
}

const { user } = inject('user');
const router = useRouter();

const loading = ref(true);
const mapRef = ref(null);
const stations = ref([]);
let map;

onMounted(async () => {
  // Optional loading delay (simulated)
  setTimeout(async () => {
    if (user.value === null) {
      router.push('/');
      return;
    }

    // Initialize map
    map = L.map(mapRef.value).setView([19.0760, 72.8777], 5); // Centered on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    try {
      const res = await api.get('/stations');
      stations.value = res.data ?? [];

      stations.value.forEach((station) => {
        const [lng, lat] = station.location?.coordinates ?? [72.8777, 19.0760];
        const statusColor = station.status === 'active' ? '#22c55e' : '#ef4444';

        const popupContent = `
          <div style="min-width: 240px; font-family: sans-serif; line-height: 1.4;">
            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 6px;">${station.name}</h3>
            <div style="font-size: 14px;">
              <p><strong>Status:</strong> 
                <span style="background-color: ${statusColor}; color: white; padding: 2px 8px; border-radius: 9999px;">
                  ${station.status}
                </span>
              </p>
              <p><strong>Connector:</strong> ${station.connecterType}</p>
              <p><strong>Power Output:</strong> ${station.powerOutput} kW</p>
              <p><strong>Created:</strong> ${new Date(station.createdAt).toLocaleDateString()}</p>
              <p><strong>Coordinates:</strong> [${lat.toFixed(4)}, ${lng.toFixed(4)}]</p>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { title: station.name }).addTo(map);
        marker.bindPopup(popupContent);
      });
    } catch (err) {
      console.error('Failed to load stations:', err);
      alert('Failed to load charging stations. Please try again later.');
    } finally {
      loading.value = false;
    }
  }, 2000);
});
</script>


<template>
  <div class="w-full h-[90vh] rounded-xl shadow-lg overflow-hidden border border-gray-300">
    <div ref="mapRef" class="h-full w-full" />
  </div>
</template>

<style scoped>
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>
