<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title>あなたの回答</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <!-- <v-text-field v-model="blog.title" disabled label="Blog Title" />
              <v-text-field v-model="blogCardAvatarName" disabled label="Author" /> -->
              <quill-editor v-model="comment" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large color="secondary" @click="postComment">
              回答を投稿する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { doc, getDoc, updateDoc } from '@firebase/firestore'
export default {
  name: 'CommentPage',
  data () {
    return {
      blogid: '',
      comment: ''
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    },
    blog () {
      const blogid = this.$route.query.blogid
      const blog = this.blogs.filter((blog) => {
        return blog.id === blogid
      })
      return blog[0]
    },
    avatars () {
      return this.$store.state.avatars.avatars
    },
    blogCardAvatar () {
      const result = this.avatars.filter((avatar) => {
        return avatar.user_id === this.blog.user_id
      })
      return result
    },
    blogCardAvatarName () {
      return this.blogCardAvatar[0].displayName
    }
  },
  mounted () {
    this.$store.dispatch('blogs/init')
    this.blogid = this.$route.query.blogid
  },
  methods: {
    postComment () {
      const docRef = doc(this.$db, 'blogs', this.blogid)
      const newDate = new Date()
      getDoc(docRef).then((doc) => {
        const data = doc.data().comments || []
        const commentId = this.getRandomStrings()
        data.push({
          comment_id: commentId,
          comment: this.comment,
          comment_created_at: newDate,
          comment_user_id: this.$store.state.user.uid,
          comment_user_name_atthattime: this.$store.state.user.displayName
        })
        updateDoc(docRef, { comments: data })
        this.$router.push({ path: 'question_card_detail', query: { blogid: this.blogid } })
      })
    },
    getRandomStrings () {
      const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+'
      // 桁数の定義
      const len = 20
      // ランダムな文字列の生成
      let result = ''
      for (let i = 0; i < len; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length))
      }
      return result
    }
  }
}
</script>

<style>
.quill-editor {
  height: px;
}
</style>
