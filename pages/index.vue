<template>
  <v-container>
    <br>
      <v-row justify="center">
        <div style="color:orange; font-weight:bold">
          ホームページを刷新しました！（2024年４月30日）
        </div>
      </v-row>
    <br>
    <!-- <v-img src="https://firebasestorage.googleapis.com/v0/b/rereagrihp.appspot.com/o/%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%88%E3%82%99%E3%82%B7%E3%83%A7%E3%83%BC%E3%80%80%E3%82%B3%E3%83%A1%E3%83%BB%E3%82%A2%E3%83%95%E3%82%9A%E3%83%AA%EF%BC%93%20(1).png?alt=media&token=aea726c4-51c0-4121-b673-063ec1e9ba91"></v-img> -->
    <v-img src="https://firebasestorage.googleapis.com/v0/b/rereagrihp.appspot.com/o/topPage.png?alt=media&token=243d8e75-c4dd-43ff-9bf0-aeab905abcca"></v-img>
    <br><br>
    <v-row justify="center">
      <div style="color:orange; font-weight:bold">
        ↓自治体様向け
      </div>
    </v-row>
    <v-row justify="center">
      <v-btn outlined rounded color="orange" style="font-weight: bold;">
        <a style="color: orange;" href="https://childcarereservation-b5da8.web.app/" target="_blank">幼稚園の一時預かり保育アプリ</a>
      </v-btn>
    </v-row>
    <!-- <v-row>
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
    </v-fab-transition> -->
  </v-container>
</template>

<script>
// import Ranking from '~/components/Ranking.vue'
export default {
  name: 'IndexPage',
  // components: { Ranking },
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
