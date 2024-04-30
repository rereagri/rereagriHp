<template>
  <!-- <div class="pointer" @click="toUserPage"> -->
  <div class="pointer">
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
      return result
    },
    photoURL () {
      if (this.loginUserAvatar.length === 0 || this.loginUserAvatar[0].photoURL === null || this.loginUserAvatar[0].photoURL === '') {
        return 'null'
      } else {
        return this.loginUserAvatar[0].photoURL
      }
    }
  },
  mounted () {
    this.$store.dispatch('avatars/init')
  },
  methods: {
    toUserPage () {
      const id = this.$store.state.user.uid
      const name = this.$store.state.user.displayName
      this.$router.push({ path: '/user_page', query: { userId: id, userName: name } })
    }
  }
}
</script>

<style scoped>
</style>
