<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header color="orange" class="white--text">
        タグの選択・変更（５つまで）
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-chip-group
          v-model="tagIndex"
          column
          multiple
          max="5"
        >
          <v-chip
            v-for="tag in tags"
            :key="tag.id"
            filter
            outlined
            @click="receiveTag(tag.id)"
          >
            {{ tag.tagName }}
          </v-chip>
        </v-chip-group>
        <v-row class="justify-end">
          <v-btn large color="secondary" @click="addBlogTagIds">
            post
          </v-btn>
        </v-row>
        <!-- <div>
          {{ receivedTagIdArray }}
          {{ receivedTagIdArray.length }}
        </div> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'SelectTags',
  props: {
    blog: { type: Object, default: null }
  },
  data () {
    return {
      tagIndex: [],
      receivedTagIdArray: []
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags.tags
    }
  },
  mounted () {
  },
  methods: {
    receiveTag (tagId) {
      if (this.receivedTagIdArray.length === 0) {
        this.receivedTagIdArray.push(tagId)
      } else if (this.receivedTagIdArray.length < 5) {
        const result = this.receivedTagIdArray.includes(tagId)
        if (result) {
          this.receivedTagIdArray = this.receivedTagIdArray.filter((id) => {
            return id !== tagId
          })
        } else {
          this.receivedTagIdArray.push(tagId)
        }
      } else if (this.receivedTagIdArray.length === 5) {
        const result = this.receivedTagIdArray.includes(tagId)
        if (result) {
          this.receivedTagIdArray = this.receivedTagIdArray.filter((id) => {
            return id !== tagId
          })
        }
      }
    },
    addBlogTagIds () {
      this.$store.dispatch('blogs/addTagIds', { blogId: this.blog.id, tagIdsArray: this.receivedTagIdArray })
    }
  }
}
</script>

<style scoped>
</style>
