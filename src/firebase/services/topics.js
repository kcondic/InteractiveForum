import { ref, watchEffect } from 'vue';
import { database } from '@/firebase/config';

const topics = ref([]);

const unsubscribeHandle = database.collection('topics').orderBy('title').onSnapshot(snapshot => {
  let topicsArray = [];
  snapshot.forEach(doc => {
    topicsArray.push({ id: doc.id, ...doc.data() });
  });
  
  topics.value = topicsArray;
});

const getTopics = () => {
  return topics;
};

watchEffect(onInvalidate => {
  onInvalidate(() => {
    unsubscribeHandle();
  });
});

export { getTopics };