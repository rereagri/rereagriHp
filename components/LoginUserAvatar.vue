<template>
  <div>
    <v-list-item-avatar v-if="photoURL === 'null'">
      <v-icon large>
        mdi-account-circle
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-avatar v-else>
      <v-img :src="photoURL" />
    </v-list-item-avatar>
  </div>
</template>

<script>
export default {
  name: 'LoginUserAvatar',
  data () {
    return {
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    loginUserAvatar () {
      const result = this.avatars.filter((avatar) => {
        return avatar.user_id === this.$store.state.user.uid
      })
      // console.log('loginUserAvatar:', result)
      return result
    },
    photoURL () {
      const url = this.loginUserAvatar[0].photoURL
      if (url === null) {
        return 'null'
      } else {
        return url
      }
    }
  },
  mounted () {
    this.$store.dispatch('avatars/init')
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
