<template>
  <div class="posts-container">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :topic-id="topicId"
      :thread-id="threadId"
      @set-quote="setQuote"
    />
  </div>
  <PostEditor @send-post="sendPost" />
  <h3 v-if="!posts.length">
    Trenutno nema poruka u ovoj temi :(
  </h3>
  <button class="remove-quote" v-if="quotedPostId" @click="removeQuote">Makni citat</button>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Post from '@/components/posts/Post';
import PostEditor from '@/components/posts/PostEditor';
import { setupPostsListener, getPosts, submitPost } from '@/firebase/services/posts';

export default {
  components: { Post, PostEditor },
  setup() {
    const route = useRoute();

    const posts = getPosts();

    const topicId = route.params.topicId;
    const threadId = route.params.threadId;

    setupPostsListener(topicId, threadId);

    const quotedPostId = ref('');

    const setQuote = (postId) => {
      quotedPostId.value = postId;
    };

    const removeQuote = () => {
      quotedPostId.value = '';
    };

    const sendPost = async (content) => {
      await submitPost(topicId, threadId, content, quotedPostId.value);
      removeQuote();
    };

    return { posts, topicId, threadId, setQuote, removeQuote, quotedPostId, sendPost };
  }
};
</script>

<style lang="scss" scoped>
.posts-container {
  padding-bottom: 200px;
}

.remove-quote {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>