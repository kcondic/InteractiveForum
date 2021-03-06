<template>
  <div
    class="post"
    :class="{ quoted: isQuotedPost }"
  >
    <div
      v-if="!isQuotedPost"
      class="user-details-container"
    >
      <UserDetails
        :user="user"
      />
    </div>
    <div class="post-container">
      <div
        v-if="!isQuotedPost"
        class="timestamp-and-quote-container"
      >
        <div class="timestamp">
          {{ post.timestamp.toDate().toLocaleString() }}
        </div>
        <a
          v-if="authenticatedUser"
          class="quote-cta"
          @click="setQuote"
        >Citiraj</a>
      </div>
      <div class="content">
        <Post
          v-if="quotedPost"
          :post="quotedPost"
          :topic-id="topicId"
          :thread-id="threadId"
          :is-quoted-post="true"
        />
        <template v-if="isQuotedPost">
          <div class="quoted-post-author">
            <UserDetails
              :user="user"
              :only-username="true"
            /> je napisao/la:
          </div>
          <div v-html="post.content" />
        </template>
        <div
          v-else
          v-html="post.content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue';
import { getAdditionalUserInfo } from '@/firebase/services/auth';
import { getPost } from '@/firebase/services/posts';
import { getUser } from '@/firebase/services/auth';
import UserDetails from '@/components/shared/UserDetails';
import Post from '@/components/posts/Post';

export default {
  components: { UserDetails, Post },
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
  emits: ['setQuote'],
  setup(props, context) {
    const authenticatedUser = getUser();
    const user = ref(null);
    const quotedPost = ref(null);

    onMounted(async () => {
      const userInfo = await getAdditionalUserInfo(props.post.createdByUserId); 
      user.value = userInfo;
      
      let quotedPostData;
      let quotedPostId = props.post.quotedPostId;

      if(quotedPostId)
        quotedPostData = await getPost(props.topicId, props.threadId, quotedPostId);

      quotedPost.value = quotedPostData;
    });

    onUpdated(async () => {
      const userInfo = await getAdditionalUserInfo(props.post.createdByUserId); 
      user.value = userInfo;
    });

    const setQuote = () => {
      context.emit('setQuote', props.post.id);
    };

    return { authenticatedUser, user, quotedPost, setQuote };
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  
  .user-details-container .user-details {
    height: 100%;
    width: 200px;
    padding: 20px;
    border-right: 1px solid $background-color--accent;
    border-radius: 10px 0 0 10px;
    background-color: $background-color;
    color: $text-color--light;

    @media screen and (max-width: 768px) {
      width: 100%;
      border-radius: 10px 10px 0 0;
      border-right: none;
      border-bottom: 1px solid $background-color--accent;
    }

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
    max-width: calc(100% - 200px);
    padding-bottom: 20px;

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }

    .timestamp-and-quote-container {
      display: flex;
      padding: 6px;
      border-bottom: 1px solid $background-color--accent;

      .timestamp {
        color: $text-color--dark;
      }

      .quote-cta {
        margin-left: auto;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .content {
      margin-top: 10px;
      padding-left: 15px;
      padding-right: 20px;
      overflow: hidden;

      & * {
        max-width: 100%;
      }

      .quoted-post-author {
        display: flex;

        .username {
          margin-right: 5px;
        }
      }
    }
  }

  ul {
    margin-top: 0;
    padding-left: 14px;
  }

  a {
    color: $link-color;
    text-decoration: underline;
  }

  p {
    margin-top: 0;
  }

  &.quoted {
    background-color: $background-color;
    color: $text-color--light;
    border: 1px solid $background-color--light;
    box-shadow: none;

    & a {
      color: $text-color--light;
    }
  }

  .post-container .timestamp-and-quote-container ~ .content > .post.quoted {
    border: none;
  }
}
</style>