<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title>New Q&A</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="title" label="Title" placeholder="タイトルには質問概要を10字以上で書いてください" />
              <quill-editor v-model="content" rows="10" />
            </v-form>
          </v-card-text>
          <br>
          <v-container>
            <select-tags @catchTag="receiveTag" />
          </v-container>
          <br>
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
import SelectTags from '~/components/SelectTags.vue'

export default {
  name: 'PostPage',
  components: { SelectTags },
  data () {
    return {
      title: '',
      content: '',
      selectedTag: '',
      receivedTagIdArray: []
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags.tags
    }
  },
  methods: {
    postBlog () {
      const blog = {
        title: this.title,
        content: this.content,
        created_at: serverTimestamp(),
        user_id: this.$store.state.user.uid,
        user_name_atthattime: this.$store.state.user.displayName,
        viewCount: 0,
        goodReplys: [],
        bestAnswer: '',
        tagIds: this.receivedTagIdArray
      }
      this.$store.dispatch('blogs/add', blog)
        .then(() => this.$router.push('/'))
    },
    receiveTag (tagId) {
      if (this.receivedTagIdArray.length) {
        const result = this.receivedTagIdArray.includes(tagId)
        if (result) {
          this.receivedTagIdArray = this.receivedTagIdArray.filter((id) => {
            return id !== tagId
          })
        } else {
          this.receivedTagIdArray.push(tagId)
        }
      } else {
        this.receivedTagIdArray.push(tagId)
      }
    }
  }
}
</script>

<style>

</style>
