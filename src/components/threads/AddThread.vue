<template>
<div class="add-thread-container">
  <button @click="createThreadActive = true">Stvori novu temu</button>
  <template v-if="createThreadActive">
    <form class="add-thread-form" @submit.prevent="submitCreateThread">
      <input
        v-model="threadName"
        type="text"
        required
        placeholder="Ime teme"
      >
      <div class="action-container">
        <button @click="createThreadActive = false">Odustani</button>
        <button type="submit">Pošalji</button>
      </div>
    </form>
  </template>
</div>
</template>

<script>
import { ref, inject } from 'vue';
import { createThread } from '@/firebase/services/threads';

export default {
  props: {
    topicId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const toast = inject('$toast');
    const createThreadActive = ref(false);
    const threadName = ref('');

    const submitCreateThread = async () => {
      if(!threadName.value)
        toast('Ime teme ne može biti prazno', { type: 'error' });

      const response = await createThread(props.topicId, threadName.value);
      if(response)
        toast(response, { type: 'error' });
      else {
        toast('Tema uspješno stvorena', { type: 'success' });
        threadName.value = '';
        createThreadActive.value = false;
      }
    };

    return { createThreadActive, threadName, submitCreateThread };
  }
}
</script>

<style lang="scss" scoped>
.add-thread-container {
  margin-bottom: 30px;

  .add-thread-form {
    margin-top: 10px;
    
    .action-container {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      button {
        margin-left: 0;

        &:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>