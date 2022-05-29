<template>
  <div>
    <v-row>
        <v-container class="pb-0">
          <v-text-field
          v-model="searchingItems"
          outlined
          label="検索フォーム"
          append-icon="mdi-magnify"
          @input="formSearch" />
        </v-container>
      </v-container>
    </v-row>
    <v-container v-if="this.searchedBlogs !== ''">
      <div>
        &emsp;検索結果&emsp;{{ this.searchedBlogs.length }}&emsp;件
      </div>
    </v-container>
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
  name: 'BlogListForOwnComments',
  components: { Paginate },
  props: {
    userid: { type: String, default: null }
  },
  data () {
    return {
      parPage: 10,
      currentPage: 1,
      searchingItems: ''
    }
  },
  computed: {
    blogs () {
      const defaultBlogs = this.$store.state.blogs.blogs
      return this.commentsSearch(defaultBlogs, this.userid)
    },
    searchedItems () {
      return this.$store.state.searchForOwnComments.searchedItems
    },

    searchedBlogs () {
      this.search()
      return this.$store.state.searchForOwnComments.searchedBlogs
    },
    getBlogs () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      if (this.searchedBlogs === '') {
        return this.blogs.slice(start, current)
      }
      if (isNaN(this.searchedBlogs.length) === false) {
        return this.searchedBlogs.slice(start, current)
      } else {
        return this.blogs.slice(start, current)
      }
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
    this.searchingItems = this.$store.state.searchForOwnComments.searchedItems
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
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'latestDisplayName', 'latestCommentDisplayNameArray', 'latestTagNameArray']
      const searchText = this.searchingItems
      const searchedArray = search(this.blogs, searchKeys, searchText)
      this.$store.dispatch('searchForOwnComments/changeSearchedItems', searchText)
      this.$store.dispatch('searchForOwnComments/changeSearchedBlogs', searchedArray)
    },
    formSearch () {
      this.search()
      const page1 = document.querySelectorAll('.pagination li a')[1]
      page1.click()
    },
    commentsSearch (defaultBlogs, userid) {
      const searchKeys = ['comments']
      const searchText = userid
      const searchedArray = search(defaultBlogs, searchKeys, searchText)
      return searchedArray
    }
  }
}
</script>

<style scoped>

</style>
