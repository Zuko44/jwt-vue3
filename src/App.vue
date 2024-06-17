<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import router from './router';

const authStore = useAuthStore();
const token = computed(() => authStore.userInfo.token);

const checkUser = () => {
  const getUserTokens = localStorage.getItem('userTokens');
  if (getUserTokens) {
    authStore.userInfo.token = JSON.parse(getUserTokens).token;
    authStore.userInfo.refreshToken = JSON.parse(getUserTokens).refreshToken;
    authStore.userInfo.expiresIn = JSON.parse(getUserTokens).expiresIn;
  }
};

const logout = () => {
  authStore.logout();
  localStorage.removeItem('userTokens');
  router.push('/signin');
};

checkUser();
</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/signin" v-if="!token">Login</router-link>
    <router-link to="/cars" v-if="token">Cars</router-link>
    <router-link to="/signin" v-if="token" @click.prevent="logout"
      >Logout</router-link
    >
  </div>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
