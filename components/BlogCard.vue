<template>
  <v-card ref="card" class="mb-1" color="blue lighten-4" @click="toggle">
    <v-card-text class="pb-1">
      <div class="d-inline-block">
        <span>{{ created_datetime }} </span>
        <span class="pl-5 font-weight-bold">{{ blog.user_name }}</span>
      </div>
    </v-card-text>
    <v-card-actions dense class="pl-4">
      <div class="text-h5" :class="{'text-truncate':!open}">
        {{ blog.title }}
      </div>
      <v-spacer />
      <v-icon small>
        {{ open ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
      </v-icon>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="open">
        <!-- <v-card-text class="pre-wrap" v-text="blog.content" /> -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <v-card-text class="pre-wrap" v-html="blog.content" />
        <v-container>
          <!-- コメントカード -->
          <v-card v-for="comment in blog.comments" :key="comment.comment" class="my-2">
            <v-card-text class="pb-1">
              <div class="d-inline-block">
                <span>{{ comment.comment_created_at }} </span>
                <span class="pl-5 font-weight-bold">{{ comment.comment_user_name }}</span>
              </div>
            </v-card-text>
            <!-- <v-card-text>
              {{ comment.comment }}
            </v-card-text> -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-card-text v-html="comment.comment" />
          </v-card>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-btn text x-small color="primary">
            <v-icon>mdi-message-reply-text</v-icon>
            <span>{{ commentCount }}</span>
          </v-btn>
          <v-btn
            v-show="$store.getters.isAuthenticated"
            icon
            small
            color="success"
            class="ml-6"
            @click="addComment"
          >
            <v-icon>mdi-comment-edit</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn v-if="isMine" icon x-small color="secondary" @click="remove">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
// import moment from 'moment'
export default {
  props: {
    blog: { type: Object, default: null }
  },
  data () {
    return {
      open: false
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
    isMine: ({ $store, blog }) => {
      return $store.getters.isAuthenticated &&
        $store.state.user.uid === blog.user_id
    },
    commentCount: ({ blog }) => {
      return blog.comments && blog.comments.length ? blog.comments.length : 0
    }
  },
  methods: {
    remove () {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('blogs/remove', this.blog.id)
      }
    },
    addComment () {
      this.$router.push({ path: '/comment', query: { id: this.blog.id } })
    },
    toggle () {
      const open = this.open
      if (!open) { this.$emit('close') }
      this.open = !open
    },
    close () {
      this.open = false
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
