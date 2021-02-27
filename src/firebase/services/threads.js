import { ref } from 'vue';
import { database } from '@/firebase/config';

const threads = ref([]);

const setupThreadsListener = (topicId) => {
  database.collection(`topics/${topicId}/threads`).orderBy('lastUpdated', 'desc').onSnapshot(snapshot => {
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

export { setupThreadsListener, getThreads };