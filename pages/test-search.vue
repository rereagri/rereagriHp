<template>
  <div>
    <v-row>
      <v-container class="pb-0">
        <v-container class="pb-0">
          <v-text-field v-model="searchItems" outlined label="検索フォーム" append-icon="mdi-magnify" @input="search" />
        </v-container>
      </v-container>
    </v-row>
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
import { search } from 'ss-search'
export default {
  name: 'BlogList',
  components: { Paginate },
  data () {
    return {
      parPage: 10,
      currentPage: 1,
      searchItems: '',
      searchedBlogs: []
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    },
    getBlogs () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      if (!this.searchedBlogs.length) {
        return this.blogs.slice(start, current)
      } else {
        return this.searchedBlogs.slice(start, current)
      }
      // return this.searchedBlogs.slice(start, current)
    },
    getPageCount () {
      if (!this.searchedBlogs.length) {
        return Math.ceil(this.blogs.length / this.parPage)
      } else {
        return Math.ceil(this.searchedBlogs.length / this.parPage)
      }
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
    },
    search () {
      // const searchKeys = ['user_name_atthattime']
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'user_name_atthattime']
      const searchText = this.searchItems
      const searchedArray = search(this.blogs, searchKeys, searchText)
      this.searchedBlogs = searchedArray
      // console.log(this.searchedBlogs)
    }
  }
}
</script>

<style scoped>

</style>
