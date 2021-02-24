import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import DkToast from 'vue-dk-toast';

createApp(App).use(router).use(DkToast, {
  positionX: 'right',
  positionY: 'top',
  max: 3,
  duration: 3000,
  styles: {
    borderRadius: '10px'
  }
}).mount('#app');
