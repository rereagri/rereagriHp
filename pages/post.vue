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
          <v-card-text>
            <div>タグの選択</div>
            <div>{{ tags }}</div>
            <v-btn
              rounded
              outlined
              small
              v-for="tag in tags"
              :key="tag.id"
              color="warning"
              class="mr-2"
              @click="selectTag(tag)"
            >
              <div>
                {{ tag.tagName }}
              </div>
            </v-btn>
          </v-card-text>
          <v-card-text>
            <div>登録するタグ</div>
            <v-btn
              rounded
              outlined
              small
              v-for="selectedTag in selectedTagsArray"
              :key="selectedTag.id"
              color="warning"
              class="mr-2"
              @click="notSelectTag(selectedTag)"
            >
            <div>
              {{ selectedTag.tagName }}
            </div>
            <v-icon
              right
              dark
            >
              mdi-close-circle
            </v-icon>
          </v-btn>
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
      content: '',
      selectedTag: '',
      selectedTagsArray: []
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
        bestAnswer: ''
      }
      this.$store.dispatch('blogs/add', blog)
        .then(() => this.$router.push('/'))
    },
    selectTag (tag) {
      this.selectedTagsArray.push(tag)
    },
    notSelectTag (selectedTag) {
      this.selectedTagsArray.splice(selectedTag)
    }
  }
}
</script>

<style>

</style>
