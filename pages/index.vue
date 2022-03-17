<template>
  <v-container>
    <blog-list />
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
export default {
  name: 'IndexPage'
}
</script>

<style scoped>
</style>
