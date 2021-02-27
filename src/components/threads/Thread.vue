<template>
  <router-link
    :to="{ name: 'Posts',
           params: {
             topicId: topicId,
             threadId: thread.id,
             threadTitle: textToSlug(thread.title)
           } 
    }"
    class="thread box wide"
  >
    <div>
      <div class="title">
        {{ thread.title }}
      </div>
      <div class="updated-on">
        Zadnji post: {{ thread.lastUpdated.toDate().toLocaleString() }}
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
    thread: {
      type: Object,
      default: null
    },
    topicId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const user = ref(null);

    onMounted(async () => {
      const userInfo = await getAdditionalUserInfo(props.thread.createdByUserId); 

      user.value = userInfo;
    });

    return { user, textToSlug };
  }
}
</script>

<style lang="scss" scoped>
.thread .updated-on {
  margin-top: 5px;
  color: $text-color--dark;
}
</style>