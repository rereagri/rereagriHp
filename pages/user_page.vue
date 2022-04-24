<template>
  <v-container>
    <v-row justify="center">
      <user-avatar-big class="my-15" :id="userId" :name="userName" />
    </v-row>
    <v-row justify="center">
      <div class="mb-15 text-h4">
        {{ userName }}
      </div>
    </v-row>
    <v-row dense>
      ユーザーページ【製作中】
      <v-col cols="12">
        <v-card color="blue lighten-5">
          <v-card-title class="text-h5">
            画像・名前・ランキング
          </v-card-title>
          <v-card-subtitle>
            ・・・・・・・・・・・・
          </v-card-subtitle>
          <v-card-text>
            <div class="py-2">
              ・・・・・・・・・・・・{{ userId }}
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・{{ userName }}
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card color="blue lighten-5">
          <v-card-title class="text-h5">
            自己紹介
          </v-card-title>
          <v-card-subtitle>
            ・・・・・・・・・・・・
          </v-card-subtitle>
          <v-card-text>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card color="blue lighten-5">
          <v-card-title class="text-h5">
            作った曲のリンク
          </v-card-title>
          <v-card-subtitle>
            ・・・・・・・・・・・・
          </v-card-subtitle>
          <v-card-text>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
            <div class="py-2">
              ・・・・・・・・・・・・
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserPage',
  data () {
    return {
      userId: '',
      userName: ''
    }
  },
  mounted () {
    this.userId = this.$route.query.userId
    this.userName = this.$route.query.userName
  }
}
</script>

<style>

</style>
