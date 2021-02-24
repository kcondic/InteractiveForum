<template>
  <nav class="header">
    <router-link :to="{ name: 'Register' }">
      Registriraj se
    </router-link>
    <router-link :to="{ name: 'Login' }">
      Prijavi se
    </router-link>
  </nav>
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

    return { username, email, password, repeatedPassword }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: $background-color;

  a {
    margin-right: 20px;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    text-transform: uppercase;
    color: $text-color--light;
    font-weight: 700;
    padding: 10px 0 8px 0;

    &:hover, &.router-link-exact-active {
      border-bottom-color: $text-color--light;
    }
  }
}
</style>