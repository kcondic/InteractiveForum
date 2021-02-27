<template>
  <h1>Kategorije</h1>
  <Topic
    v-for="topic in topics"
    :key="topic.id"
    :topic="topic"
  />
</template>

<script>
import Topic from '@/components/topics/Topic';
import { getTopics } from '@/firebase/services/topics';

export default {
  components: { Topic },
  setup() {
    const topics = getTopics();

    return { topics };
  }
};
</script>