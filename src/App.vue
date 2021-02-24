<template>
  <Header />
  <router-view />
</template>

<script>
import Header from '@/components/shared/Header';
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  margin: 0;
  font-size: 14px;
  font-family: Arial;
}
</style>
