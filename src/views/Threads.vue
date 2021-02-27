<template>
  <h1>Teme</h1>
  <Thread
    v-for="thread in threads"
    :key="thread.id"
    :thread="thread"
    :topic-id="topicId"
  />
  <h3 v-if="!threads.length">Trenutno nema tema u ovoj kategoriji :(</h3>
</template>

<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import Thread from '@/components/threads/Thread';
import { setupThreadsListener, getThreads } from '@/firebase/services/threads';

export default {
  components: { Thread },
  setup() {
    const route = useRoute();

    const threads = getThreads();
    watch(threads, () => {
      console.log(JSON.stringify(threads.value));
    })

    const topicId = route.params.topicId;
    setupThreadsListener(topicId);

    return { threads, topicId };
  }
};
</script>