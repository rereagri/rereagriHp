<template>
  <v-container>
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="basil">
        <v-container>
          <v-tab-item>
            <div>
              test
            </div>
            <blog-list />
            <br>
              <div>
                <paginate
                  :page-count="getPageCountMonth"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="clickCallback"
                  :prev-text="'≪'"
                  :next-text="'≫'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  />
              </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              test2
            </div>
            <blog-list />
            <br>
              <div>
                <paginate
                  :page-count="getPageCountMonth"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="clickCallback"
                  :prev-text="'≪'"
                  :next-text="'≫'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  />
              </div>
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Paginate from 'vuejs-paginate'
import BlogList from './BlogList.vue'
export default {
  name: 'OwnAnswersQuestions',
  components: { Paginate, BlogList },
  data () {
    return {
      tab: null,
      items: [
        '質問した記事', '回答した記事'
      ],
      parPage: 10,
      currentPage: 1
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    goodReplys () {
      return this.$store.state.goodReplys.goodReplys
    },
    goodReplysRankingArraysAll () {
      return this.$store.state.goodReplys.goodReplysRankingArraysAll
    },
    goodReplysCountsArraysAll () {
      return this.$store.state.goodReplys.goodReplysCountsArraysAll
    },
    goodReplysRankingArraysMonth () {
      return this.$store.state.goodReplys.goodReplysRankingArraysMonth
    },
    goodReplysCountsArraysMonth () {
      return this.$store.state.goodReplys.goodReplysCountsArraysMonth
    },
    goodReplysRankingArraysWeek () {
      return this.$store.state.goodReplys.goodReplysRankingArraysWeek
    },
    goodReplysCountsArraysWeek () {
      return this.$store.state.goodReplys.goodReplysCountsArraysWeek
    },
    getGoodReplysRankingArraysAll () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.goodReplysRankingArraysAll.slice(start, current)
    },
    getGoodReplysRankingArraysMonth () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.goodReplysRankingArraysMonth.slice(start, current)
    },
    getGoodReplysRankingArraysWeek () {
      const current = this.currentPage * this.parPage
      const start = current - this.parPage
      return this.goodReplysRankingArraysWeek.slice(start, current)
    },
    getPageCountAll () {
      return Math.ceil(this.goodReplysRankingArraysAll.length / this.parPage)
    },
    getPageCountMonth () {
      return Math.ceil(this.goodReplysRankingArraysMonth.length / this.parPage)
    },
    getPageCountWeek () {
      return Math.ceil(this.goodReplysRankingArraysWeek.length / this.parPage)
    }
  },
  mounted () {
    this.$store.dispatch('avatars/init')
    this.$store.dispatch('goodReplys/init')
    this.$store.dispatch('goodReplys/rankingAll')
    this.$store.dispatch('goodReplys/rankingMonth')
    this.$store.dispatch('goodReplys/rankingWeek')
  },
  methods: {
    rank (value, arrs, updown) {
      if (typeof (updown) === 'undefined') {
        updown = 0
      }
      const sign = updown === 0 ? 1 : -1
      let thisrank = 1
      const arrayLength = arrs.length
      for (let i = 0; i < arrayLength; i++) {
        if (sign * (arrs[i] - value) > 0) {
          thisrank++
        }
      }
      return thisrank
    },
    clickCallback (pageNum) {
      this.currentPage = Number(pageNum)
    }
  }
}
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
.primary--text {
  color: primary !important;
}
.noborder {
  border: 0px none;
}
</style>
