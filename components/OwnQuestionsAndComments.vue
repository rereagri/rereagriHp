<template>
  <v-container>
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="">
        <v-container>
          <v-tab-item>
            <br>
            <blog-list-for-own-questions :userid="userid" />
          </v-tab-item>
          <v-tab-item>
            <br>
            <blog-list-for-own-comments :userid="userid" />
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import BlogListForOwnComments from './BlogListForOwnComments.vue'
import BlogListForOwnQuestions from './BlogListForOwnQuestions.vue'
export default {
  name: 'OwnQuestionsAndComments',
  components: { BlogListForOwnQuestions, BlogListForOwnComments },
  props: {
    userid: { type: String, default: null }
  },
  data () {
    return {
      tab: null,
      items: [
        '質問した記事', '回答した記事'
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
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
