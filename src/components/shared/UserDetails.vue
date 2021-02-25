<template>
  <div v-if="user" class="user-details">
    <div class="username">{{ user.username }}</div>

  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    onlyUsername: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>