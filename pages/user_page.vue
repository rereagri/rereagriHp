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
      <v-col cols="12">
        <v-card color="blue lighten-5">
          <v-card-title class="text-h5 justify-center ">
            自己紹介・曲紹介
          </v-card-title>
          <v-card-text v-if="this.avatar[0]" class="content ql-editor" v-html="this.avatar[0].content" />
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
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    avatar () {
      const avatar = this.avatars.filter((avatar) => {
        return avatar.user_id === this.userId
      })
      // console.log('avatar', avatar)
      if (avatar.length === 0) {
        return 0
      } else {
        return avatar
      }
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
