<template>
  <div>
    <v-list v-if="blogs.length" class="overflow-y-auto">
      <v-list-item v-for="(blog, index) in getBlogs" :key="index">
        <question-card ref="card" :blog="blog" :index="index" @close="closeAll" />
      </v-list-item>
    </v-list>
    <span v-else>No Blogs...</span>
    <paginate
      :page-count="getPageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'≪'"
      :next-text="'≫'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    />
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  name: 'BlogList',
  components: { Paginate },
  data () {
    return {
      parPage: 10,
      currentPage: 1
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    },
    getBlogs () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.blogs.slice(start, current)
    },
    getPageCount () {
      return Math.ceil(this.blogs.length / this.parPage)
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
    },
    clickCallback (pageNum) {
      this.currentPage = Number(pageNum)
    }
  }
}
</script>

<style scoped>

</style>
