<template>
  <div>
    <v-list v-if="blogs.length" class="overflow-y-auto">
      <v-list-item v-for="blog in blogs" :key="blog.id">
        <v-container class="py-1">
          <blog-card ref="card" :blog="blog" @close="closeAll" />
        </v-container>
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
