import { ref, watchEffect } from 'vue';
import { database, timestamp } from '@/firebase/config';
import { getUser } from '@/firebase/services/auth';

const threads = ref([]);
let unsubscribeHandle;

const setupThreadsListener = (topicId) => {
  unsubscribeHandle = database.collection(`topics/${topicId}/threads`).orderBy('lastUpdated', 'desc')
    .onSnapshot(snapshot => {
    let threadsArray = [];
    snapshot.forEach(doc => {
      doc.data().lastUpdated && threadsArray.push({ id: doc.id, ...doc.data() });
    });

    threads.value = threadsArray;
  });
};

const getThreads = () => {
  return threads;
};

const updateThreadLastUpdated = async (topicId, threadId) => {
  await database.collection(`topics/${topicId}/threads`)
    .doc(threadId)
    .update({
      lastUpdated: timestamp()
    });
};

const createThread = async (topicId, threadName) => {
  const user = getUser();

  if(!user || !user.value)
    return 'Morate biti prijavljeni da bi stvorili temu';

  await database.collection(`topics/${topicId}/threads`).doc().set({
    createdByUserId: user.value.uid,
    title: threadName,
    lastUpdated: timestamp()
  });
}

watchEffect(onInvalidate => {
  onInvalidate(() => {
    unsubscribeHandle();
  });
});

export { setupThreadsListener, getThreads, updateThreadLastUpdated, createThread };