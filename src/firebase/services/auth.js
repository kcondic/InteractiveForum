import { auth } from "@/firebase/config";

const tryRegister = async (email, password, username) => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    
    if(!response)
      throw new Error('Registracija neuspješna! Molimo pokušajte ponovo.');

    await response.user.updateProfile({ displayName: username });
    
    return response;  
  } catch (error) {
    return error;
  }
}

export { tryRegister };