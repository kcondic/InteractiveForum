import { ref, watchEffect } from 'vue';
import { database, timestamp } from '@/firebase/config';
import { getUser, getAdditionalUserInfo } from '@/firebase/services/auth';
import { updateThreadLastUpdated, getThread } from '@/firebase/services/threads';

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

const quotes = ref([]);
let unsubscribeQuotedHandle;

const setupQuotedListener = (userId) => {
  let initialData = true;
  unsubscribeQuotedHandle = database.collection(`users/${userId}/postQuotations`)
  .onSnapshot(snapshot => {
    const docQuotes = [];
    if(initialData)
      initialData = false;
    else
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added')
          docQuotes.push(change.doc.data().quotation);
      });
      
    quotes.value = docQuotes;
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

const getQuotes = () => {
  return quotes;
}

const submitPost = async(topicId, threadId, content, quotedPostId) => {
  const user = getUser();

  if(!user || !user.value)
    return;

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
  await updateThreadLastUpdated(topicId, threadId);

  if(quotedPostId)
  {
    const quotedPost = await getPost(topicId, threadId, quotedPostId);

    if(!quotedPost)
      return;

    const quotedPostAuthorId = quotedPost.createdByUserId;

    if(quotedPostAuthorId === user.value.uid)
      return;

    const userWhoQuoted = await getAdditionalUserInfo(user.value.uid);

    const threadToWhichItWasPosted = await getThread(topicId, threadId);

    await updateUserQuotedDocuments(quotedPostAuthorId, userWhoQuoted.username, threadToWhichItWasPosted.title);
  }
}

const incrementUserPosts = async (user) => {
  const userDocReference = database.collection('users').doc(user.uid);
  const userDoc = await userDocReference.get();

  const currentNumberOfPosts = userDoc.data().numberOfPosts;
  await userDocReference.update({
    numberOfPosts: currentNumberOfPosts + 1
  });
}

const updateUserQuotedDocuments = async (quotedPostAuthorId, userWhoQuotedUsername, threadToWhichItWasPostedTitle) => {
  const quotationToInsert = `Korisnik ${userWhoQuotedUsername} te citirao na temi ${threadToWhichItWasPostedTitle}. Provjeri temu da bi vidio/la novu aktivnost!`;

  await database.collection(`users/${quotedPostAuthorId}/postQuotations`).doc().set({
    quotation: quotationToInsert
  });
}

watchEffect(onInvalidate => {
  onInvalidate(() => {
    unsubscribeHandle();
    unsubscribeQuotedHandle();
  });
});

export { setupPostsListener, getPosts, getPost, submitPost, setupQuotedListener, getQuotes };