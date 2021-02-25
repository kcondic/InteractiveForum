import { ref } from 'vue';
import { database } from '@/firebase/config';

const topics = ref(null);

database.collection('topics').onSnapshot(snapshot => {
  let topicsArray = [];
  snapshot.forEach(doc => {
    topicsArray.push({ id: doc.id, ...doc.data() });
  });

  topics.value = topicsArray.sort((firstTopic, secondTopic) => 
    firstTopic.title < secondTopic.title ? -1 : 1);
})

const getTopics = () => {
  return topics;
}

export { getTopics };