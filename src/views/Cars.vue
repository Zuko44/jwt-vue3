<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import '../api/api.ts';

const authStore = useAuthStore();
const cars = ref();

const getAllCars = async () => {
  try {
    // const response = await axios.get(
    //   `https://jwt-firebase-46e88-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${
    //     authStore.userInfo.token
    //   }`,
    // );
    const response = await axios.get(
      `https://jwt-firebase-46e88-default-rtdb.europe-west1.firebasedatabase.app/cars.json`,
    );
    cars.value = response.data;
  } catch (err: any) {
    console.log(err.response);
  }
};

onMounted(async () => {
  await getAllCars();
});
</script>

<template>
  <div>
    <h2>Cars</h2>
    <div v-for="(car, i) in cars">
      <div>{{ car.name }}</div>
      <div>{{ car.type }}</div>
    </div>
  </div>
</template>

<style scoped></style>

<!-- https://console.firebase.google.com/project/jwt-firebase-46e88/database/jwt-firebase-46e88-default-rtdb/data/~2F -->
