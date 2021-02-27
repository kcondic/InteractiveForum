<template>
  <router-link
    :to="{ name: 'Threads',
           params: { topicId: topic.id,
                     topicTitle: textToSlug(topic.title)
           }
    }"
    class="topic box wide"
  >
    <div>
      <div class="title">
        {{ topic.title }}
      </div>
      <div class="subtitle">
        {{ topic.subtitle }}
      </div>
    </div>
    <div class="user-details">
      <span class="author">Stvorio:</span>
      <UserDetails
        :user="user"
        :only-username="true"
      />
    </div>
  </router-link>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAdditionalUserInfo } from '@/firebase/services/auth';
import UserDetails from '@/components/shared/UserDetails';
import { textToSlug } from '@/utils/utils';

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

    return { user, textToSlug };
  }
}
</script>

<style lang="scss" scoped>
.topic .subtitle {
  color: $text-color--dark;
}
</style>