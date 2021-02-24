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
      type="text"
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
    <button type="submit">
      Registriraj se
    </button>
  </form>
  <div class="switch-auth-type">
    Već imaš račun?
    <router-link :to="{ name: 'Login' }">
      Prijavi se
    </router-link>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { tryRegister } from '@/firebase/services/auth';

export default {
  setup() {
    const toast = inject('$toast');

    const username = ref('');
    const email = ref('');
    const password = ref('');
    const repeatedPassword = ref('');

    const register = async () => {
      let isValidMail = /\S+@\S+\.\S+/.test(email.value);

      if(!isValidMail) {
        toast('E-mail adresa nije važeća.', { type: 'error' });
        return;
      }

      let isValidUsername = username.value.length >= 6;

      if(!isValidUsername) {
        toast('Korisničko ime je prekratko.', { type: 'error' });
        return;
      }

      let isValidPassword = password.value.length >= 6;

      if(!isValidPassword) {
        toast('Lozinka je prekratka.', { type: 'error' });
        return;
      }

      let doPasswordsMatch = password.value === repeatedPassword.value;

      if(!doPasswordsMatch) {
        toast('Lozinke se ne poklapaju.', { type: 'error' });
        return;
      }

      const response = await tryRegister(email.value, password.value, username.value);
      console.log(response);
      if(!response.user)
        toast(response.message);
    }

    return { username, email, password, repeatedPassword, register }
  }
}
</script>