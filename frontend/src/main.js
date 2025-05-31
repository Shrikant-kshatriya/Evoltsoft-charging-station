import './assets/main.css'
import 'leaflet/dist/leaflet.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';

const app = createApp(App)

app.use(router)
app.use(ToastPlugin)
app.mount('#app')
