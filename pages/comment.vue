<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title>New Comment for ...</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="blog.title" disabled label="Blog Title" />
              <v-text-field v-model="blog.user_name" disabled label="Author" />
              <!-- <v-textarea v-model="comment" rows="6" outlined autofocus label="Your Comment" /> -->
              <!-- <quill-editor v-model="editor" /> -->
              <quill-editor v-model="comment" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large color="secondary" @click="postComment">
              post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { format } from 'date-fns'
export default {
  name: 'CommentPage',
  data () {
    return {
      blogId: '',
      blog: {},
      comment: ''
      // editorOption: {
      //   theme: 'bubble'
      // }
    }
  },
  mounted () {
    this.blogId = this.$route.query.id
    const docRef = doc(this.$db, 'blogs', this.blogId)
    getDoc(docRef).then((doc) => {
      this.blog = doc.data()
    })
  },
  methods: {
    postComment () {
      const docRef = doc(this.$db, 'blogs', this.blogId)
      const newDate = format(new Date(), 'yyyy-MM-dd HH:mm')
      getDoc(docRef).then((doc) => {
        const data = doc.data().comments || []
        // const serverTimestamp = serverTimestamp()
        const commentId = this.getRandomStrings()
        data.push({
          comment_id: commentId,
          comment: this.comment,
          comment_created_at: newDate,
          comment_user_id: this.$store.state.user.uid,
          comment_user_name: this.$store.state.user.displayName
        })
        updateDoc(docRef, { comments: data })
        this.$router.push('/')
      })
    },
    getRandomStrings () {
      const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+'
      // 桁数の定義
      const len = 12
      // ランダムな文字列の生成
      let result = ''
      for (let i = 0; i < len; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length))
      }
      // console.log(result)
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
