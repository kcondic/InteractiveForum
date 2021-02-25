<template>
  <div class="topic">
    <div class="main-info">
      <div class="title">{{ topic.title }}</div>
      <div class="subtitle">{{ topic.subtitle }}</div>
    </div>
    <UserDetails :user="user" :only-username="true" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAdditionalUserInfo } from '@/firebase/services/auth';
import UserDetails from '@/components/shared/UserDetails';

export default {
  components: { UserDetails },
  props: {
    topic: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const user = ref(null);

    onMounted(async () => {
      const userInfo = await getAdditionalUserInfo(props.topic.createdByUserId); 

      user.value = userInfo;
    });

    return { user };
  }
}
</script>

<style lang="scss" scoped>

</style>