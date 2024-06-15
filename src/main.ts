import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import '../src/api/api';

import App from './App.vue';
import router from './router';

const firebaseConfig = {
  apiKey: 'AIzaSyAeAWdKSf27dPMB_s3eTS3fuPz_ZcaCB34',
  authDomain: 'jwt-firebase-46e88.firebaseapp.com',
  projectId: 'jwt-firebase-46e88',
  storageBucket: 'jwt-firebase-46e88.appspot.com',
  messagingSenderId: '732412129252',
  appId: '1:732412129252:web:79da15b196fd9c1f4421f1',
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
