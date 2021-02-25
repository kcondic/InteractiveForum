import { ref } from 'vue';
import { database, auth, timestamp } from '@/firebase/config';

const tryRegister = async (email, password, username) => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);

    if(!response)
      throw new Error();

    await response.user.updateProfile({ displayName: username });
    await storeAdditionalUserInfo(response.user);

    return response;  
  } catch (error) {
    return error;
  }
}

const storeAdditionalUserInfo = async (user) => {
  await database.collection('users').doc(user.uid).set({
    username: user.displayName,
    numberOfPosts: 0,
    joined: timestamp()
  });
}

const getAdditionalUserInfo = async (userId) => {
  const userInfo = await database.collection('users').doc(userId).get();

  return userInfo.data();
}

const tryLogin = async (email, password) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);

    if(!response)
      throw new Error();

    return response;
  } catch (error) {
    return error;
  }
}

const tryLogout = async () => {
  try {
    await auth.signOut();
  } catch(error) {
    return error;
  }
}

const user = ref(auth.currentUser);

auth.onAuthStateChanged(firebaseUser => {
  user.value = firebaseUser;
});

const getUser = () => {
  return user;
}

export { tryRegister, tryLogin, tryLogout, getUser, getAdditionalUserInfo };