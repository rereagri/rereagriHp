<template>
  <v-container>
    <div>
      <ul>
        <li v-for="item in getItems" :key="item">
          {{ item }}
        </li>
      </ul>
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
  </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  name: 'TestPage',
  components: { Paginate },
  data () {
    return {
      // items: items,
      parPage: 10,
      currentPage: 1
    }
  },
  computed: {
    items () {
      const items = []
      for (let i = 1; i <= 105; i++) {
        items.push('item-' + i)
      }
      return items
      // return this.$store.state.blogs.blogs
    },
    getItems () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.items.slice(start, current)
    },
    getPageCount () {
      return Math.ceil(this.items.length / this.parPage)
    }
  },
  mounted () {
    // this.$store.dispatch('avatars/init')
  },
  methods: {
    clickCallback (pageNum) {
      this.currentPage = Number(pageNum)
    }
  }
}
</script>

<style socoped>
.v-main-wrap {
  position: relative;
}
.pagination {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  margin: 10 0 0 0;
  padding: 0;
  list-style-type: none;
  user-select: none;
}
.pagination li {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 0 2px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
}
.pagination li.active {
  /* background: #F5811F; */
  background: #0D47A1;
}
.pagination li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
.pagination li.active a {
  color: #fff;
}
.pagination li.focus a {
  outline: none;
}
</style>
