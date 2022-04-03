<template>
  <v-card ref="card" class="mb-3" color="blue lighten-4" @click="$router.push({path: 'question_card_detail', query: {blogid: blog.id, index: index}}); addViewCount()">
    <v-card-text class="pb-1 pointer">
      <div class="d-inline-block">
        <span>{{ created_datetime }} </span>
        <span class="pl-5 font-weight-bold">{{ blog.user_name }}</span>
        <v-btn v-if="isBestAnswerAtTitle()" x-small color="success" class="pointer-events-none ml-3">
          <div>
            解決済み
          </div>
        </v-btn>
      </div>
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
export default {
  props: {
    blog: { type: Object, default: null },
    index: { type: null, default: null }
  },
  data () {
    return {
      // open: false,
      // good: false
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
    // isMine: ({ $store, blog }) => {
    //   return $store.getters.isAuthenticated &&
    //     $store.state.user.uid === blog.user_id
    // },
    commentCount: ({ blog }) => {
      return blog.comments && blog.comments.length ? blog.comments.length : 0
    }
  },
  methods: {
    isBestAnswerAtTitle () {
      if (this.blog.bestAnswer.comment_id) {
        return true
      } else {
        return false
      }
    },
    // remove () {
    //   if (confirm('Are you sure?')) {
    //     this.$store.dispatch('blogs/remove', this.blog.id)
    //   }
    // },
    // removeComment (comment, index) {
    //   if (confirm('Are you sure?')) {
    //     // console.log('commentsIndex:', index)
    //     // console.log('comment:', comment)
    //     // console.log('this.blog.id:', this.blog.id)
    //     this.$store.dispatch('blogs/removeComment', { blogId: this.blog.id, commentObj: comment, commentsIndex: index })
    //   }
    // },
    // addComment () {
    //   this.$router.push({ path: '/comment', query: { id: this.blog.id } })
    // },
    // toggle () {
    //   const open = this.open
    //   if (!open) {
    //     this.addViewCount()
    //     this.$emit('close')
    //   }
    //   this.open = !open
    // },
    // goodToggle (comment, index) {
    //   if (this.$store.getters.isAuthenticated) {
    //     const goodReplyArray = this.blog.goodReplys
    //     const loginUserId = this.$store.state.user.uid
    //     const commentId = comment.comment_id
    //     // console.log('goodReplyArray:', goodReplyArray)
    //     // console.log('loginUserId:', loginUserId)
    //     // console.log('commentId:', commentId)
    //     const isGoodUser = goodReplyArray.filter(function (goodReply) {
    //       return goodReply.user_id === loginUserId && goodReply.comment_id === commentId
    //     })
    //     // console.log('isGoodUser:', isGoodUser)
    //     if (isGoodUser.length) {
    //       // console.log('true')
    //       this.$store.dispatch('blogs/deleteGoodReply', { blogId: this.blog.id, commentObj: comment, commentsIndex: index, userId: loginUserId })
    //     } else {
    //       // console.log('false')
    //       this.$store.dispatch('blogs/addGoodReply', { blogId: this.blog.id, commentObj: comment, commentsIndex: index, userId: loginUserId })
    //     }
    //   }
    // },
    // close () {
    //   this.open = false
    // },
    addViewCount () {
      const docRef = doc(this.$db, 'blogs', this.blog.id)
      // console.log('docRef:', docRef)
      updateDoc(docRef, { viewCount: this.blog.viewCount + 1 })
    }
    // stateUserId (comment) {
    //   if (this.$store.getters.isAuthenticated && this.$store.state.user.uid === comment.comment_user_id) {
    //     // console.log('this.$store.state.user.uid:', this.$store.state.user.uid)
    //     return true
    //   }
    // },
    // goodIsMine (comment) {
    //   if (this.$store.getters.isAuthenticated) {
    //     const goodReplyArray = this.blog.goodReplys
    //     const loginUserId = this.$store.state.user.uid
    //     const commentId = comment.comment_id
    //     // console.log('goodReplyArray:', goodReplyArray)
    //     // console.log('loginUserId:', loginUserId)
    //     // console.log('commentId:', commentId)
    //     const isGoodUser = goodReplyArray.filter(function (goodReply) {
    //       return goodReply.user_id === loginUserId && goodReply.comment_id === commentId
    //     })
    //     // console.log('isGoodUser:', isGoodUser)
    //     if (isGoodUser.length) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // },
    // goodReplyCount (comment) {
    //   const commentId = comment.comment_id
    //   const goodReplyArray = this.blog.goodReplys
    //   const isGood = goodReplyArray.filter(function (goodReply) {
    //     return goodReply.comment_id === commentId
    //   })
    //   if (isGood.length) {
    //     return isGood.length
    //   } else {
    //     return 0
    //   }
    // }
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
  .pointer {
    cursor: pointer;
  }
  .pointer-events-none {
  pointer-events: none
  }
</style>
