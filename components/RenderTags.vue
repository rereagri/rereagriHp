<template>
  <div>
    <v-btn
      v-for="tagId in blogTagIdsArray"
      :key="tagId"
      rounded
      depressed
      x-small
      color="warning"
      class="mr-2"
    >
      <div>
        {{ getTagName(tagId) }}
      </div>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'RenderTags',
  props: {
    blog: { type: Object, default: null }
  },
  data () {
    return {
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags.tags
    },
    blogTagIdsArray () {
      if (this.blog) {
        return this.blog.tagIds
      } else {
        return null
      }
    }
  },
  mounted () {
  },
  methods: {
    getTagName (tagId) {
      return this.tags.filter((tag) => {
        return tag.id === tagId
      })[0].tagName
    }
  }
}
</script>

<style scoped>
</style>
