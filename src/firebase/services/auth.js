import { ref } from 'vue';
import { auth } from '@/firebase/config';

const tryRegister = async (email, password, username) => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);

    if(!response)
      throw new Error();

    await response.user.updateProfile({ displayName: username });

    return response;  
  } catch (error) {
    return error;
  }
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

export { tryRegister, tryLogin, tryLogout, getUser };