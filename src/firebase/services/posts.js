import { ref, watchEffect } from 'vue';
import { database, timestamp } from '@/firebase/config';
import { getUser } from '@/firebase/services/auth';

const posts = ref([]);
let unsubscribeHandle;

const setupPostsListener = (topicId, threadId) => {
  unsubscribeHandle = database.collection(`topics/${topicId}/threads/${threadId}/posts`)
  .orderBy('timestamp')
  .onSnapshot(snapshot => {
    let postsArray = [];
    snapshot.forEach(doc => {
      doc.data().timestamp && postsArray.push({ id: doc.id, ...doc.data() });
    });

    posts.value = postsArray;
  });
};

const getPosts = () => {
  return posts;
};

const getPost = async (topicId, threadId, postId) => {
  if(!topicId || !threadId || !postId)
    return null;

  const post = await database.collection(`topics/${topicId}/threads/${threadId}/posts`)
    .doc(postId).get();

  return post.data();
}

const submitPost = async(topicId, threadId, content, quotedPostId) => {
  const user = getUser();

  const newPost = {
    createdByUserId: user.value.uid,
    content: content,
    timestamp: timestamp(),
    quotedPostId: quotedPostId
  };

  await database.collection(`topics/${topicId}/threads/${threadId}/posts`).doc().set({
    ...newPost
  });

  await incrementUserPosts(user.value);
}

const incrementUserPosts = async (user) => {
  const userDocReference = database.collection('users').doc(user.uid);
  const userDoc = await userDocReference.get();

  const currentNumberOfPosts = userDoc.data().numberOfPosts;
  await userDocReference.update({
    numberOfPosts: currentNumberOfPosts + 1
  });
}

watchEffect(onInvalidate => {
  onInvalidate(() => {
    unsubscribeHandle();
  });
});

export { setupPostsListener, getPosts, getPost, submitPost };