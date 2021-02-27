import { ref } from 'vue';
import { database } from '@/firebase/config';

const threads = ref([]);

const setupThreadsListener = (topicId) => {
  database.collection(`topics/${topicId}/threads`).onSnapshot(snapshot => {
    let threadsArray = [];
    snapshot.forEach(doc => {
      threadsArray.push({ id: doc.id, ...doc.data() });
    });

    threads.value = threadsArray.sort((firstThread, secondThread) => 
      firstThread.lastUpdated < secondThread.lastUpdated ? 1 : -1);
  });
};

const getThreads = () => {
  return threads;
};

export { setupThreadsListener, getThreads };