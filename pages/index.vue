<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
        <blog-list />
      </v-col>
      <v-col cols="0" md="5">
        <ranking />
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        color="deep-orange darken-2"
        dark
        fixed
        absolute
        large
        bottom
        right
        fab
        to="/post"
        style="bottom: 50px"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import Ranking from '~/components/Ranking.vue'
export default {
  name: 'IndexPage',
  components: { Ranking },
  data () {
    return {
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

</style>
