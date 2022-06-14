<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="7">
        <br>
        <blog-list />
      </v-col>
      <v-col cols="0" md="5" class="hidden-md-and-down">
        <ranking />
        <v-container>
          <v-card ref="card" class="mb-3" color="blue lighten-4">
            <v-card-text class="text-center">
              <v-icon>mdi-email-multiple</v-icon>
              <a href="mailto:dtmservice0701@gmail.com">運営へのメールはこちらから<br>（タグの提案もこちらから受け付けます）</a>
            </v-card-text>
          </v-card>
        </v-container>
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
