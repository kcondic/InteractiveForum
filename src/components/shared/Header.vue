<template>
  <nav class="header">
    <router-link :to="{ name: 'Login' }">
      Prijava
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: $background-color;

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