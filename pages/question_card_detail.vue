<template>
  <v-container>
    <v-card ref="card" class="mb-3" color="blue lighten-4">
      <v-card-text class="pb-1">
        <div class="d-inline-block">
          <span>{{ created_datetime }} </span>
          <!-- <span class="pl-5 font-weight-bold">{{ blog.user_name }}</span> -->
          <span v-if="blog" class="px-2 font-weight-bold">{{ blogCardAvatarName }}</span>
          <v-btn v-if="blog && isBestAnswerAtTitle()" small color="success" class="pointer-events-none mr-2">
            <div>
              解決済み
            </div>
          </v-btn>
        </div>
        <user-avatar v-if="blog" :id="blog.user_id" :name="blogCardAvatarName.toString()" />
        <render-tags :blog="blog" />
        <div v-if="blog" class="text-h5">
          {{ blog.title }}
        </div>
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-card-text v-if="blog" class="content ql-editor pre-wrap" v-html="blog.content" />
          <v-container v-if="blog">
            <!-- ***コメントカード*** -->
            <v-card v-for="(comment, index) in blog.comments" :key="index" class="my-2">
              <v-card-text class="pb-1">
                <div class="d-inline-block">
                  <!-- <span>{{ comment.comment_created_at }} </span> -->
                  <span>{{ $dateFns.format(comment.comment_created_at.toDate(), 'yyyy-MM-dd HH:mm') }}</span>
                  <!-- <span class="pl-5 font-weight-bold">{{ comment.comment_user_name }}</span> -->
                  <span v-if="blog && avatars" class="px-2 font-weight-bold">{{ commentCardAvatarName(comment) }}</span>
                </div>
                <user-avatar v-if="blog && avatars" :id="comment.comment_user_id" :name="commentCardAvatarName(comment).toString()" />
              </v-card-text>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <v-card-text class="content ql-editor" v-html="comment.comment" />
              <v-card-actions>
                <v-btn text x-small color="primary" class="mb-2" @click="goodToggle(comment)">
                  <v-icon v-if="isGoodReplyMine(comment)">
                    mdi-thumb-up
                  </v-icon>
                  <v-icon v-else>
                    mdi-thumb-up-outline
                  </v-icon>
                  <span>{{ goodReplyCount(comment) }}</span>
                </v-btn>
                <v-btn v-if="isBestAnswer(comment)" x-small color="success" class="pointer-events-none">
                  <div>
                    ベストアンサー
                  </div>
                </v-btn>
                <v-btn v-if="isBestAnswer(comment) && isBlogMine" x-small color="warning" @click="deleteBestAnswer(comment)">
                  <div>
                    ベストアンサー削除
                  </div>
                </v-btn>
                <v-btn v-if="blog && isBlogMine && !isCommentMine(comment) && !isBestAnswer(comment)" x-small color="primary" @click="beBestAnswer(comment)">
                  <div>
                    ベストアンサーにする
                  </div>
                </v-btn>
                <v-spacer />
                <v-btn v-if="isCommentUserId(comment)" icon x-small color="secondary" @click="removeComment(comment, index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
          <div v-if="blog && isBlogMine">
            <v-divider />
            <br>
            <v-container>
              <select-tags-for-card-detail :blog="blog" />
            </v-container>
            <br>
            <v-divider />
          </div>
          <v-card-actions>
            <v-btn class="pointer-events-none" text x-small color="primary">
              <v-icon>mdi-message-reply-text</v-icon>
              <span v-if="blog">{{ commentCount }}</span>
            </v-btn>
            <v-btn class="pointer-events-none" text x-small color="primary" style="cursor: default">
              <v-icon>mdi-eye</v-icon>
              <span v-if="blog">{{ blog.viewCount }}</span>
            </v-btn>
            <v-btn
              icon
              small
              color="success"
              class="ml-6"
              @click="addComment"
            >
              <v-icon>mdi-comment-edit</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn v-if="blog && isBlogMine" icon x-small color="secondary" @click="remove">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { doc, updateDoc } from '@firebase/firestore'
import SelectTagsForCardDetail from '~/components/SelectTagsForCardDetail.vue'
// import UserAvatar from './UserAvatar.vue'
export default {
  components: { SelectTagsForCardDetail },
  // components: { UserAvatar },
  // props: {
  //   blog: { type: Object, default: null }
  // },
  data () {
    return {
      open: false,
      good: false,
      blogId: ''
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    },
    blog () {
      // const index = this.$route.query.index
      // return this.blogs[index]
      const blogid = this.$route.query.blogid
      const blog = this.blogs.filter((blog) => {
        // console.log('filter blog', blog)
        return blog.id === blogid
      })
      // console.log('blog:', blog)
      return blog[0]
    },
    avatars () {
      return this.$store.state.avatars.avatars
    },
    blogCardAvatarName () {
      const avatar = this.avatars.filter((avatar) => {
        return avatar.user_id === this.blog.user_id
      })
      // console.log('avatar', avatar)
      if (avatar.length === 0) {
        return 0
      } else {
        return avatar[0].displayName
      }
    },
    // commentCardAvatarName ({ comment }) {
    //   const avatar = this.avatars.filter((avatar) => {
    //     return avatar.user_id === comment.comment_user_id
    //   })
    //   return avatar[0].displayName
    // },
    created_datetime: ({ $dateFns, blog }) => {
      if (blog && blog.created_at) {
        return $dateFns.format(blog.created_at.toDate(), 'yyyy-MM-dd HH:mm')
      } else {
        return ''
      }
    },
    isBlogMine: ({ $store, blog }) => {
      return $store.getters.isAuthenticated && blog.user_id === $store.state.user.uid
    },
    commentCount: ({ blog }) => {
      return blog.comments && blog.comments.length ? blog.comments.length : 0
    }
  },
  mounted () {
    this.$store.dispatch('blogs/init')
    this.blogId = this.$route.query.blogid
    // this.index = this.$route.query.index
  },
  methods: {
    remove () {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('blogs/remove', this.blog.id)
      }
      // this.$store.dispatch('blogs/init')
      this.$router.push('/')
    },
    removeComment (comment, index) {
      if (confirm('Are you sure?')) {
        // console.log('commentsIndex:', index)
        // console.log('comment:', comment)
        // console.log('this.blog.id:', this.blog.id)
        this.$store.dispatch('blogs/removeComment', { blogId: this.blog.id, commentObj: comment, commentsIndex: index })
      }
    },
    addComment () {
      this.$router.push({ path: '/comment', query: { blogid: this.blog.id } })
    },
    // toggle () {
    //   const open = this.open
    //   if (!open) {
    //     this.addViewCount()
    //     this.$emit('close')
    //   }
    //   this.open = !open
    // },
    goodToggle (comment) {
      if (this.$store.getters.isAuthenticated) {
        const goodReplyArray = this.blog.goodReplys
        const loginUserId = this.$store.state.user.uid
        const commentId = comment.comment_id
        // console.log('goodReplyArray:', goodReplyArray)
        // console.log('loginUserId:', loginUserId)
        // console.log('commentId:', commentId)
        const isGoodUser = goodReplyArray.filter(function (goodReply) {
          return goodReply.user_id === loginUserId && goodReply.comment_id === commentId
        })
        // console.log('isGoodUser:', isGoodUser)
        if (isGoodUser.length) {
          // console.log('true')
          // console.log('this.blog:', this.blog)
          // console.log('this.blog.goodReplys:', this.blog.goodReplys)
          // console.log('this.blog.id:', this.blog.id)
          // console.log('this.blogs:', this.blogs)
          // console.log('this.blogId:', this.blogId)
          this.$store.dispatch('blogs/deleteGoodReply', { blogId: this.blog.id, commentObj: comment, userId: loginUserId })
        } else {
          // console.log('false')
          // console.log('this.blog:', this.blog)
          // console.log('this.blog.goodReplys:', this.blog.goodReplys)
          // console.log('this.blog.id:', this.blog.id)
          // console.log('this.blogs:', this.blogs)
          // console.log('this.blogId:', this.blogId)
          this.$store.dispatch('blogs/addGoodReply', { blogId: this.blog.id, commentObj: comment, userId: loginUserId })
        }
      } else {
        this.$router.push('/login')
      }
    },
    beBestAnswer (comment) {
      const loginUserId = this.$store.state.user.uid
      this.$store.dispatch('blogs/beBestAnswer', { blogId: this.blog.id, commentObj: comment, userId: loginUserId })
    },
    deleteBestAnswer (comment) {
      const loginUserId = this.$store.state.user.uid
      this.$store.dispatch('blogs/deleteBestAnswer', { blogId: this.blog.id, commentObj: comment, userId: loginUserId })
    },
    isBestAnswerAtTitle () {
      // console.log('this.blog', this.blog)
      if (this.blog.bestAnswer.comment_id) {
        return true
      } else {
        return false
      }
    },
    isBestAnswer (comment) {
      if (this.blog.bestAnswer.comment_id === comment.comment_id) {
        return true
      } else {
        return false
      }
    },
    close () {
      this.open = false
    },
    addViewCount () {
      const docRef = doc(this.$db, 'blogs', this.blog.id)
      // console.log('docRef:', docRef)
      updateDoc(docRef, { viewCount: this.blog.viewCount + 1 })
    },
    isCommentUserId (comment) {
      if (this.$store.getters.isAuthenticated && this.$store.state.user.uid === comment.comment_user_id) {
        // console.log('this.$store.state.user.uid:', this.$store.state.user.uid)
        return true
      }
    },
    isGoodReplyMine (comment) {
      if (this.$store.getters.isAuthenticated) {
        const goodReplyArray = this.blog.goodReplys
        const loginUserId = this.$store.state.user.uid
        const commentId = comment.comment_id
        // console.log('goodReplyArray:', goodReplyArray)
        // console.log('loginUserId:', loginUserId)
        // console.log('commentId:', commentId)
        const isGoodUser = goodReplyArray.filter(function (goodReply) {
          return goodReply.user_id === loginUserId && goodReply.comment_id === commentId
        })
        // console.log('isGoodUser:', isGoodUser)
        if (isGoodUser.length) {
          return true
        } else {
          return false
        }
      }
    },
    goodReplyCount (comment) {
      const commentId = comment.comment_id
      const goodReplyArray = this.blog.goodReplys
      const isGood = goodReplyArray.filter(function (goodReply) {
        return goodReply.comment_id === commentId
      })
      if (isGood.length) {
        return isGood.length
      } else {
        return 0
      }
    },
    blogMake () {
      const makedBlog = this.blogs.filter(function (blog) {
        return blog.id === this.blogId
      })
      return makedBlog
    },
    commentCardAvatarName (comment) {
      const avatar = this.avatars.filter((avatar) => {
        return avatar.user_id === comment.comment_user_id
      })
      // console.log('avatar', avatar)
      if (avatar.length === 0) {
        return 0
      } else {
        return avatar[0].displayName
      }
    },
    // commentCardAvatarName2 (comment) {
    //   // console.log('comment.comment_user_id:', comment.comment_user_id)
    //   // const result = this.avatars.filter((avatar) => {
    //   //   return avatar.user_id === comment.comment_user_id
    //   // })
    //   // console.log('result:', result)
    //   // return result[0].displayName
    //   const avatar = this.avatars.filter((avatar) => {
    //     return avatar.user_id === comment.comment_user_id
    //   })
    //   // console.log('avatar', avatar)
    //   if (avatar.length === 0) {
    //     return 0
    //   } else {
    //     return avatar[0].displayName
    //   }
    // },
    isCommentMine (comment) {
      if (this.blog.user_id === comment.comment_user_id) {
        return true
      }
      // return $store.getters.isAuthenticated &&
      //   $store.state.user.uid === comment.user_id
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
