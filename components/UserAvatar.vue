<template>
  <span ref="userAvatar">
    <v-avatar v-if="photoURL==='null'" size="30">
      <v-icon large>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <v-avatar v-else size="30">
      <v-img :src="photoURL" />
    </v-avatar>
  </span>
</template>

<script>
export default {
  name: 'LoginUserAvatar',
  props: {
    blog: { type: Object, default: null }
  },
  data () {
    return {
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    blogUserAvatar ({ blog }) {
      // console.log('blog:', blog)
      // console.log('blog.user_id:', blog.user_id)
      const result = this.avatars.filter((avatar) => {
        return avatar.user_id === blog.user_id
      })
      // console.log('blogUserAvatar:', result)
      return result
    },
    photoURL () {
      const blogUserAvatar = this.blogUserAvatar
      if (blogUserAvatar.length === 0) {
        return 'null'
      } else {
        const url = this.blogUserAvatar[0].photoURL
        return url
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
