<template>
  <div
    v-if="user"
    class="user-details"
  >
    <div class="username">
      {{ user.username }}
    </div>
    <template v-if="!onlyUsername">
      <div class="number-of-posts">
        Broj postova: {{ user.numberOfPosts }}
      </div>
      <div class="member-since">
        Korisnik od: {{ joinedDate }}
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    onlyUsername: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const joinedDate = computed(() => {
      let joinDate = props.user.joined.toDate();
      return `${joinDate.getDate()}.${joinDate.getMonth()}.${joinDate.getFullYear()}.`;
    });

    return { joinedDate };
  }
}
</script>