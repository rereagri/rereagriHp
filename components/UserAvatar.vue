<template>
  <!-- <span class="pointer" @click="toUserPage"> -->
  <span class="pointer">
    <v-avatar v-if="photoURL==='null'" size="35">
      <v-icon size="35">
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <v-avatar v-else size="35">
      <v-img :src="photoURL" />
    </v-avatar>
  </span>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    id: { type: String },
    name: { type: String }
  },
  data () {
    return {
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    userAvatar ({ id }) {
      const result = this.avatars.filter((avatar) => {
        return avatar.user_id === id
      })
      return result
    },
    photoURL () {
      const userAvatar = this.userAvatar
      if (userAvatar.length === 0 || userAvatar[0].photoURL === null || userAvatar[0].photoURL === '') {
        return 'null'
      } else {
        const url = this.userAvatar[0].photoURL
        return url
      }
    }
  },
  mounted () {
  },
  methods: {
    toUserPage () {
      this.$router.push({ path: '/user_page', query: { userId: this.id, userName: this.name } })
    }
  }
}
</script>

<style scoped>
</style>
