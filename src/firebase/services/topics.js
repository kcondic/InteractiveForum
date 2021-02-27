import { ref } from 'vue';
import { database } from '@/firebase/config';

const topics = ref([]);

database.collection('topics').orderBy('title').onSnapshot(snapshot => {
  let topicsArray = [];
  snapshot.forEach(doc => {
    topicsArray.push({ id: doc.id, ...doc.data() });
  });
  
  topics.value = topicsArray;
});

const getTopics = () => {
  return topics;
};

export { getTopics };