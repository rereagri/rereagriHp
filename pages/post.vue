<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title>New Blog</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="title" label="Title" placeholder="タイトルには質問概要を10字以上で書いてください" />
              <v-textarea v-model="content" rows="10" label="Content" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large color="secondary" @click="postBlog">
              post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { serverTimestamp } from 'firebase/firestore'

export default {
  name: 'PostPage',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    postBlog () {
      const blog = {
        title: this.title,
        content: this.content,
        created_at: serverTimestamp(),
        user_id: this.$store.state.user.uid,
        user_name: this.$store.state.user.displayName
      }
      this.$store.dispatch('blogs/add', blog)
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style>

</style>
