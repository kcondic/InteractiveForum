<template>
  <nav class="header">
    <template v-if="user">
      <span class="username">{{ user.displayName }}</span>
      <button @click="logout">
        Odjava
      </button>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Login' }">
        Prijava
      </router-link>
    </template>
  </nav>
</template>

<script>
import { inject } from 'vue';
import { getUser, tryLogout } from '@/firebase/services/auth';

export default {
  setup() {
    const toast = inject('$toast');

    const user = getUser();
    
    const logout = async () => {
      const response = await tryLogout();
      if(response && response.message)
        toast('Odjava neuspješna. Molimo pokušajte ponovo.', { type: 'error' });
    }

    return { user, logout }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: $background-color;

  .username {
    color: $text-color--light;
    margin-right: 10px;
    padding: 10px 0;
  }

  a {
    margin-right: 20px;
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