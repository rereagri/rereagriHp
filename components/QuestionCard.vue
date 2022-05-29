<template>
  <v-card ref="card" class="mb-3" color="blue lighten-4" @click="$router.push({path: 'question_card_detail', query: {blogid: blog.id}}); addViewCount()">
    <v-card-text class="pb-1 pointer">
      <div class="d-inline-block">
        <span>{{ created_datetime }} </span>
        <span class="px-2 font-weight-bold">{{ blogCardAvatarName }}</span>
        <v-btn v-if="isBestAnswerAtTitle()" x-small color="success" class="pointer-events-none mr-2">
          <div>
            解決済み
          </div>
        </v-btn>
      </div>
      <user-avatar :id="blog.user_id" :name="blogCardAvatarName.toString()" />
      <render-tags :blog="blog" />
      <div class="text-h5">
        {{ blog.title }}
      </div>
      <v-card-actions class="px-0">
        <v-btn class="pointer-events-none" text x-small color="primary">
          <v-icon>mdi-message-reply-text</v-icon>
          <span>{{ commentCount }}</span>
        </v-btn>
        <v-btn class="pointer-events-none" text x-small color="primary">
          <v-icon>mdi-eye</v-icon>
          <span>{{ blog.viewCount }}</span>
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { doc, updateDoc } from '@firebase/firestore'
import UserAvatar from './UserAvatar.vue'
import RenderTags from './RenderTags.vue'
export default {
  components: { UserAvatar, RenderTags },
  props: {
    blog: { type: Object, default: null },
    index: { type: null, default: null }
  },
  data () {
    return {
    }
  },
  computed: {
    created_datetime: ({ $dateFns, blog }) => {
      if (blog && blog.created_at) {
        return $dateFns.format(blog.created_at.toDate(), 'yyyy-MM-dd HH:mm')
      } else {
        return ''
      }
    },
    commentCount: ({ blog }) => {
      return blog.comments && blog.comments.length ? blog.comments.length : 0
    },
    avatars () {
      return this.$store.state.avatars.avatars
    },
    blogCardAvatarName () {
      const avatar = this.avatars.filter((avatar) => {
        return avatar.user_id === this.blog.user_id
      })
      if (avatar.length === 0) {
        return 0
      } else {
        return avatar[0].displayName
      }
    }
  },
  mounted () {
  },
  methods: {
    isBestAnswerAtTitle () {
      if (this.blog.bestAnswer.comment_id) {
        return true
      } else {
        return false
      }
    },
    addViewCount () {
      const docRef = doc(this.$db, 'blogs', this.blog.id)
      updateDoc(docRef, { viewCount: this.blog.viewCount + 1 })
    }
  }
}
</script>

<style scoped>
  .v-card {
    width: 100%;
  }
  .pre-wrap {
    white-space: pre-wrap;
  }
</style>
