<template>
  <h1>Teme</h1>
  <AddThread
    v-if="user"
    :topic-id="topicId"
  />
  <Thread
    v-for="thread in threads"
    :key="thread.id"
    :thread="thread"
    :topic-id="topicId"
  />
  <h3 v-if="!threads.length">
    Trenutno nema tema u ovoj kategoriji :(
  </h3>
</template>

<script>
import { useRoute } from 'vue-router';
import Thread from '@/components/threads/Thread';
import AddThread from '@/components/threads/AddThread';
import { setupThreadsListener, getThreads } from '@/firebase/services/threads';
import { getUser } from '@/firebase/services/auth';

export default {
  components: { Thread, AddThread },
  setup() {
    const route = useRoute();

    const user = getUser();
    const threads = getThreads();

    const topicId = route.params.topicId;
    setupThreadsListener(topicId);

    return { user, threads, topicId };
  }
};
</script>