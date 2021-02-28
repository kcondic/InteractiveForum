<template>
  <nav class="header">
    <router-link
      class="home-icon"
      :to="{ name: 'Topics' }"
    >
      <img :src="homeIcon">
    </router-link>
    <template v-if="user">
      <router-link :to="{ name: 'Profile' }" class="username">
        {{ user.displayName }}
      </router-link>
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
    const homeIcon = require('@/assets/home.svg');

    const user = getUser();
    
    const logout = async () => {
      const response = await tryLogout();
      if(response && response.message)
        toast('Odjava neuspješna. Molimo pokušajte ponovo.', { type: 'error' });
    }

    return { user, logout, homeIcon };
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

  a:not(.username) {
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

  a.home-icon {
    filter: invert(1);
    padding: 0;
    display: flex;
    align-items: center;
    border-bottom: none;
    margin-right: auto;
    margin-left: 10px;

    img {
      height: 24px;
    }
  }
}
</style>