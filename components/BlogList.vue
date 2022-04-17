<template>
  <div>
    <v-container>
    <v-text-field
      outlined
      label="検索フォーム製作中"
      append-icon="mdi-magnify">
    </v-text-field>
    </v-container>
    <v-list v-if="blogs.length" class="overflow-y-auto">
      <v-list-item v-for="(blog, index) in blogs" :key="index">
        <question-card ref="card" :blog="blog" :index="index" @close="closeAll" />
      </v-list-item>
    </v-list>
    <span v-else>No Blogs...</span>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    }
  },
  mounted () {
    this.$store.dispatch('blogs/init')
  },
  methods: {
    closeAll () {
      for (const i in this.blogs) {
        this.$refs.card[i].close()
      }
    }
  }
}
</script>

<style scoped>
</style>
