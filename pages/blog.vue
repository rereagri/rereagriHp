<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <br>
        <blog-list />
      </v-col>
    </v-row>
    <v-fab-transition v-if="$store.getters.isAuthenticated">
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
export default {
  name: 'IndexPage',
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
