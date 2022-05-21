<template>
  <div>
    <v-row>
      <v-container class="pb-0">
        <v-text-field
          v-model="searchingItems"
          outlined
          label="検索フォーム"
          append-icon="mdi-magnify"
          @input="formSearch"
        />
      </v-container>
    </v-row>
    <v-container text-center mb-3>
      <v-row align="center" justify="space-around">
        <v-btn color="primary" outlined @click="newArrivalOrder">新着順</v-btn>
        <v-btn color="primary" outlined @click="solvedOnly">解決済みのみ</v-btn>
        <v-btn color="primary" outlined @click="notSolvedOnly">未解決のみ</v-btn>
        <v-btn color="primary" outlined @click="notCommentsOnly">未回答のみ</v-btn>
      </v-row>
      <!-- <v-tabs background-color="transparent" color="primary" grow>
        <v-tab @click="newArrivalOrder">新着順</v-tab>
        <v-tab @click="solvedOnly" @change="solvedOnly">解決済みのみ</v-tab>
        <v-tab>未解決のみ</v-tab>
        <v-tab>未回答のみ</v-tab>
      </v-tabs> -->
    </v-container>
    <v-container v-if="searchedBlogs !== ''">
      <div>
        &emsp;検索結果&emsp;{{ searchedBlogs.length }}&emsp;件
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
  name: 'BlogList',
  components: { Paginate },
  data () {
    return {
      parPage: 10,
      currentPage: 1,
      searchingItems: ''
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs.blogs
    },
    searchedItems () {
      return this.$store.state.search.searchedItems
    },
    searchedBlogs () {
      // console.log('searchedBlogs:', this.$store.state.search.searchedBlogs)
      // console.log('this.searchingItems:', this.searchingItems)
      // console.log('this.searchedItems:', this.searchedItems)
      return this.$store.state.search.searchedBlogs
    },
    getBlogs () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      if (!this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        // console.log('1')
        return this.blogs.slice(start, current)
      } else if (this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        // console.log('2')
        return this.searchedBlogs.slice(start, current)
      } else if (!this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        // console.log('3')
        return 0
        // return this.blogs.slice(start, current)
        // return this.searchedBlogs.slice(start, current)
      } else if (this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        // console.log('4')
        return this.searchedBlogs.slice(start, current)
      } else if (this.searchedBlogs.length && this.searchingItems && !this.searchedItems) {
        // console.log('5')
        return this.searchedBlogs.slice(start, current)
      } else if (this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        // console.log('6')
        return this.searchedBlogs.slice(start, current)
      } else if (!this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        // console.log('7')
        return this.blogs.slice(start, current)
      } else {
        // console.log('8')
        return this.blogs.slice(start, current)
      }
    },
    getPageCount () {
      if (!this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        return Math.ceil(this.blogs.length / this.parPage)
      } else if (this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        return Math.ceil(this.searchedBlogs.length / this.parPage)
      } else if (!this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        return Math.ceil(0 / this.parPage)
      } else if (this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        return Math.ceil(this.searchedBlogs.length / this.parPage)
      } else if (this.searchedBlogs.length && this.searchingItems && !this.searchedItems) {
        return Math.ceil(this.searchedBlogs.length / this.parPage)
      } else if (this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        return Math.ceil(this.searchedBlogs.length / this.parPage)
      } else if (!this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        return Math.ceil(this.blogs.length / this.parPage)
      } else {
        return Math.ceil(this.blogs.length / this.parPage)
      }
    }
  },
  mounted () {
    this.$store.dispatch('blogs/init')
    this.searchingItems = this.$store.state.search.searchedItems
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
    search (searchText) {
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'latestDisplayName', 'latestCommentDisplayNameArray']
      if (!this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        // console.log('11')
        const searchedArray = search(this.blogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        // console.log('22')
        const searchedArray = search(this.searchedBlogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (!this.searchedBlogs.length && this.searchingItems && this.searchedItems) {
        // console.log('33')
        const searchedArray = search(this.blogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (this.searchedBlogs.length && !this.searchingItems && !this.searchedItems) {
        // console.log('44')
        const searchedArray = search(this.searchedBlogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (this.searchedBlogs.length && this.searchingItems && !this.searchedItems) {
        // console.log('55')
        const searchedArray = search(this.searchedBlogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        // console.log('66')
        const searchedArray = search(this.searchedBlogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (!this.searchedBlogs.length && !this.searchingItems && this.searchedItems) {
        // console.log('77')
        const searchedArray = search(this.blogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
      if (!this.searchedBlogs.length && this.searchingItems && !this.searchedItems) {
        // console.log('88')
        const searchedArray = search(this.blogs, searchKeys, searchText)
        this.$store.dispatch('search/changeSearchedItems', searchText)
        this.$store.dispatch('search/changeSearchedBlogs', searchedArray)
      }
    },
    formSearch () {
      const searchText = this.searchingItems
      this.search(searchText)
      const page1 = document.querySelectorAll('.pagination li a')[1]
      page1.click()
    },
    newArrivalOrder () {
      const newArrivalOrderBlogs = this.blogs
      // console.log('solvedBlogs:', solvedBlogs)
      this.searchingItems = ''
      // this.$store.dispatch('search/changeSearchedItems', searchText)
      this.$store.dispatch('search/changeSearchedBlogs', newArrivalOrderBlogs)
    },
    solvedOnly () {
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'latestDisplayName', 'latestCommentDisplayNameArray']
      const searchText = this.searchingItems
      const searchedArray = search(this.blogs, searchKeys, searchText)
      const solvedBlogsArray = this.blogs.filter((blog) => {
        return blog.bestAnswer
      })
      const combineArray = [...searchedArray, ...solvedBlogsArray]
      const duplicatedArray = combineArray.filter(item =>
        searchedArray.includes(item) && solvedBlogsArray.includes(item)
      )
      const newDuplicatedArray = [...new Set(duplicatedArray)]
      // console.log('newDuplicatedArray:', newDuplicatedArray)
      this.$store.dispatch('search/changeSearchedBlogs', newDuplicatedArray)
    },
    notSolvedOnly () {
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'latestDisplayName', 'latestCommentDisplayNameArray']
      const searchText = this.searchingItems
      const searchedArray = search(this.blogs, searchKeys, searchText)
      const noSolvedBlogsArray = this.blogs.filter((blog) => {
        return !blog.bestAnswer
      })
      const combineArray = [...searchedArray, ...noSolvedBlogsArray]
      const duplicatedArray = combineArray.filter(item =>
        searchedArray.includes(item) && noSolvedBlogsArray.includes(item)
      )
      const newDuplicatedArray = [...new Set(duplicatedArray)]
      this.$store.dispatch('search/changeSearchedBlogs', newDuplicatedArray)
    },
    notCommentsOnly () {
      const searchKeys = ['comments', 'content', 'created_at', 'title', 'latestDisplayName', 'latestCommentDisplayNameArray']
      const searchText = this.searchingItems
      const searchedArray = search(this.blogs, searchKeys, searchText)
      const notCommentsArray = this.blogs.filter((blog) => {
        return !blog.comments
      })
      const combineArray = [...searchedArray, ...notCommentsArray]
      const duplicatedArray = combineArray.filter(item =>
        searchedArray.includes(item) && notCommentsArray.includes(item)
      )
      const newDuplicatedArray = [...new Set(duplicatedArray)]
      this.$store.dispatch('search/changeSearchedBlogs', newDuplicatedArray)
    }
  }
}
</script>

<style scoped>

</style>
