<template>
  <div class="not-found">
    <img class="stop" :src="require('@/assets/404.jpg')" />
    <div class="title">Nema ničeg ovdje!</div>
    <div class="subtitle">
      Možete se vratiti na
      <router-link class="back-to-home" :to="{ name: 'Topics' }">naslovnicu</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stop {
  max-width: 100%;
}

.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  margin-top: 6px;
  font-size: 16px;
  text-align: center;

  .back-to-home {
    color: $link-color;
    text-decoration: underline;
  }
}
</style>