<template>
  <UserDetails :user="user" />
  <form
    class="box"
    @submit.prevent="submitChangePassword"
  >
    <h2>Promjena lozinke</h2>
    <input
      v-model="newPassword"
      type="password"
      required
      placeholder="Nova lozinka"
    >
    <input
      v-model="repeatedNewPassword"
      type="password"
      required
      placeholder="Ponovljena nova lozinka"
    >
    <button>Promijeni</button>
  </form>
</template>

<script>
import { ref, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { changePassword, tryLogout, getUser, getAdditionalUserInfo } from '@/firebase/services/auth';
import UserDetails from '@/components/shared/UserDetails';

export default {
  components: { UserDetails },
  setup() {
    const router = useRouter();
    const toast = inject('$toast');
    const authenticatedUser = getUser();
    const user = ref(null);

    onMounted(async () => {
      const userId = authenticatedUser.value.uid;
      const userInfo = await getAdditionalUserInfo(userId); 

      user.value = userInfo;
    });

    watch(authenticatedUser, () => {
      if(!authenticatedUser.value)
        router.push({ name: 'Topics' });
    })

    const newPassword = ref('');
    const repeatedNewPassword = ref('');

    const submitChangePassword = async () => {
      let isValidPassword = newPassword.value.length >= 6;
      if(!isValidPassword) {
        toast('Lozinka je prekratka.', { type: 'error' });
        return;
      }

      let doPasswordsMatch = newPassword.value === repeatedNewPassword.value;
      if(!doPasswordsMatch) {
        toast('Lozinke se ne poklapaju.', { type: 'error' });
        return;
      }

      const errorResponse = await changePassword(newPassword.value);

      if(errorResponse) {
        toast('Promjena lozinke neuspješna! Molimo prijavite se ponovo ' +
          'da bi promijenili lozinku.' + errorResponse, { type: 'error' });
        await tryLogout();
        router.push({ name: 'Login' });
      }
      else {
        toast('Promjena lozinke uspješna!', { type: 'success' });
        newPassword.value = '';
        repeatedNewPassword.value = '';
      }
    }

    return { user, newPassword, repeatedNewPassword, submitChangePassword };
  }
}
</script>

<style lang="scss" scoped>
.user-details {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>