<template>
  <Post
    v-for="post in posts"
    :key="post.id"
    :post="post"
    :topic-id="topicId"
    :thread-id="threadId"
  />
  <h3 v-if="!posts.length">
    Trenutno nema poruka u ovoj temi :(
  </h3>
</template>

<script>
import { useRoute } from 'vue-router';
import Post from '@/components/posts/Post';
import { setupPostsListener, getPosts } from '@/firebase/services/posts';

export default {
  components: { Post },
  setup() {
    const route = useRoute();

    const posts = getPosts();

    const topicId = route.params.topicId;
    const threadId = route.params.threadId;

    setupPostsListener(topicId, threadId);

    return { posts, topicId, threadId };
  }
};
</script>