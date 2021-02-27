import { ref } from 'vue';
import { database } from '@/firebase/config';

const posts = ref([]);

const setupPostsListener = (topicId, threadId) => {
  database.collection(`topics/${topicId}/threads/${threadId}/posts`)
  .onSnapshot(snapshot => {
    let postsArray = [];
    snapshot.forEach(doc => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });

    posts.value = postsArray.sort((firstPost, secondPost) => 
      firstPost.timestamp < secondPost.timestamp ? -1 : 1);
  });
};

const getPosts = () => {
  return posts;
};

const getPost = async (topicId, threadId, postId) => {
  if(!postId)
    return null;

  const post = await database.collection(`topics/${topicId}/threads/${threadId}/posts`)
    .doc(postId).get();

  return post.data();
}

export { setupPostsListener, getPosts, getPost };