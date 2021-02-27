<template>
  <div class="post-editor">
    <vue-editor v-model="content" />
  </div>
  <button class="post-button" @click="sendPost">Pošalji</button>
</template>

<script>
import { ref } from 'vue';
import { VueEditor } from 'vue3-editor';

export default {
  components: { VueEditor },
  setup(props, context) {
    const content = ref('');

    const sendPost = () => {
      context.emit('sendPost', content.value);
      content.value = '';
    };

    return { content, sendPost };
  }
}
</script>

<style lang="scss" scoped>
.post-editor {
  height: 200px;
  position: fixed;
  bottom: 0;
  left: 20px;
  right: 20px;
  background-color: $background-color--light;
  overflow-y: auto;
}

.post-button {
  position: fixed;
  bottom: 10px;
  right: 50px;
}
</style>