<template>
  <div class="post">
    <template
      v-if="!isQuotedPost"
    >
      <UserDetails
        :user="user"
      />
    </template>
    <div class="post-container">
      <div class="timestamp">
        {{ post.timestamp.toDate().toLocaleString() }}
      </div>
      <div class="content">
        <Post
          v-if="quotedPost"
          :post="quotedPost"
          :topic-id="topicId"
          :thread-id="threadId"
          :is-quoted-post="true"
        />
        <div class="quoted-post" v-if="isQuotedPost">
          <div class="author">
            <UserDetails
              :user="user"
              :only-username="true"
            /> je napisao/la:
          </div>
          <div class="content">
            {{ post.content }}
          </div>
        </div>
        <template v-else>
          {{ post.content }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAdditionalUserInfo } from '@/firebase/services/auth';
import { getPost } from '@/firebase/services/posts';
import UserDetails from '@/components/shared/UserDetails';

export default {
  components: { UserDetails },
  props: {
    post: {
      type: Object,
      default: null
    },
    topicId: {
      type: String,
      default: ''
    },
    threadId: {
      type: String,
      default: ''
    },
    isQuotedPost: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const user = ref(null);
    const quotedPost = ref(null);

    onMounted(async () => {
      const userInfo = await getAdditionalUserInfo(props.post.createdByUserId); 
      user.value = userInfo;
      
      const quotedPostData = await getPost(props.post.quotedPostId);
      quotedPost.value = quotedPostData;
    });

    return { user, quotedPost };
  }
}
</script>

<style lang="scss">
.post {
  display: flex;
  background-color: $background-color--light;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 8px 12px 20px -10px $box-shadow-color;
  
  .user-details {
    padding: 20px;
    border-right: 1px solid $background-color--accent;
    border-radius: 10px 0 0 10px;
    background-color: $background-color;
    color: $text-color--light;

    .username {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .number-of-posts {
      margin-bottom: 5px;
    }
  }

  .post-container {
    border-radius: 10px;
    flex-grow: 1;

    .timestamp {
      padding: 6px;
      margin-bottom: 10px;
      border-bottom: 1px solid $background-color--accent;
    }

    .content {
      padding-left: 15px;
      padding-right: 20px;

      .quoted-post {
        .author {

        }

        .content {

        }
      }
    }
  }
}
</style>