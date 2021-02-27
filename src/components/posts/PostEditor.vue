<template>
  <div class="post-editor">
    <vue-editor :disabled="!user" v-model="content" />
  </div>
  <button v-if="user" class="post-button" @click="sendPost">Pošalji</button>
</template>

<script>
import { ref, inject } from 'vue';
import { VueEditor } from 'vue3-editor';
import { getUser } from '@/firebase/services/auth';

export default {
  components: { VueEditor },
  setup(props, context) {
    const content = ref('');
    const user = getUser();
    const toast = inject('$toast');

    const sendPost = () => {
      if(!content.value) {
        toast('Poruka ne može biti prazna.', { type: 'error' });
        return;
      }

      context.emit('sendPost', content.value);
      content.value = '';
    };

    return { content, user, sendPost };
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