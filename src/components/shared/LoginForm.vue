<template>
  <form @submit.prevent="register">
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
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const login = () => {
      
    }

    return { email, password, login }
  }
}
</script>