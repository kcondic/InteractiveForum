<template>
  <form @submit.prevent="register">
    <input
      v-model="username"
      type="text"
      required
      placeholder="Korisničko ime"
    >
    <input
      v-model="email"
      type="email"
      required
      placeholder="E-mail"
    >
    <input
      v-model="password"
      type="password"
      required
      placeholder="Lozinka"
    >
    <input
      v-model="repeatedPassword"
      type="password"
      required
      placeholder="Ponovljena lozinka"
    >
    <button>Registriraj se</button>
  </form>
  <div class="switch-auth-type">
    Već imaš račun?
    <router-link :to="{ name: 'Login' }">
      Prijavi se
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const repeatedPassword = ref('');

    const register = () => {
      
    }

    return { username, email, password, repeatedPassword, register }
  }
}
</script>