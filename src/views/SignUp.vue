<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();
const router = useRouter();

const signup = async () => {
  await authStore.auth(
    { email: email.value, password: password.value },
    'signup',
  );
  router.push('/cars');
};
</script>

<template>
  <div class="wrapper">
    <h2>Sign up</h2>
    <form>
      <div class="error" v-if="authStore.error">
        {{ authStore.error }}
      </div>
      <div>
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div>
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <div>
        <button @click.prevent="signup">SignUp</button>
        <span
          >Are you already registered?
          <router-link to="/signin">Sign in</router-link></span
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: 320px;
  margin: 0px auto;
}

button {
  display: block;
}

.error {
  color: red;
}
</style>
