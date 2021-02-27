import { ref, watchEffect } from 'vue';
import { database, timestamp } from '@/firebase/config';

const threads = ref([]);
let unsubscribeHandle;

const setupThreadsListener = (topicId) => {
  unsubscribeHandle = database.collection(`topics/${topicId}/threads`).orderBy('lastUpdated', 'desc')
    .onSnapshot(snapshot => {
    let threadsArray = [];
    snapshot.forEach(doc => {
      threadsArray.push({ id: doc.id, ...doc.data() });
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

watchEffect(onInvalidate => {
  onInvalidate(() => {
    unsubscribeHandle();
  });
});

export { setupThreadsListener, getThreads, updateThreadLastUpdated };