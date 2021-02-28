<template>
  <form
    class="box"
    @submit.prevent="login"
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
    <button>Prijavi se</button>
  </form>
  <div class="switch-auth-type">
    Nemaš račun? 
    <router-link :to="{ name: 'Register' }">
      Registriraj se
    </router-link>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { tryLogin } from '@/firebase/services/auth';

export default {
  setup() {
    const router = useRouter();
    const toast = inject('$toast');

    const email = ref('');
    const password = ref('');

    const login = async () => {
      let isValidMail = /\S+@\S+\.\S+/.test(email.value);

      if(!isValidMail) {
        toast('E-mail adresa nije važeća.', { type: 'error' });
        return;
      }

      const response = await tryLogin(email.value, password.value);

      if(!response.user)
        toast('Neispravni podaci za prijavu.', { type: 'error' });
      else
        router.push({ name: 'Topics' });
    }

    return { email, password, login };
  }
}
</script>