<template>
  <v-app>
    <v-app-bar app dark color="blue darken-4">
      <v-toolbar-title style="cursor:pointer" @click="$router.push('/')">
        DTM QA
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!$store.getters.isAuthenticated" icon :to="'/login'">
        <v-icon :to="'/login'">
          mdi-account-circle
        </v-icon>
      </v-btn>
      <div v-else>
        <v-btn text class="px-1 pointer-events-none">
          {{ loginUserName }}
        </v-btn>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-navigation-drawer
          v-model="drawer"
          app
          right
          temporary
          absolute
        >
          <v-list>
            <v-list-item>
              <login-user-avatar />
              <v-list-item-content>
                <v-list-item-title>{{ loginUserName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="toUserPage">
              <v-list-item-icon>
                <v-icon>mdi-card-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ユーザーページ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/account_settings')">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>アカウント設定</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/user_ranking')">
              <v-list-item-icon>
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ユーザーランキング</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ログアウト</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/test')">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>テストサイト</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="test">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>各種テスト</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app dark color="blue darken-4">
      <v-row class="text-center text-caption">
        <v-col>
          <span class="pointer mx-2" @click="$router.push('/policy')">利用規約・プライバシーポリシー</span>
          <br>
          <span class="pointer mx-2" @click="$router.push('/about')">DTM QAとは・お知らせ</span>
          <br>
          <span class="pointer" @click="$router.push('/')">&copy; Copyright DTM QA All Rights {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import LoginUserAvatar from '~/components/LoginUserAvatar.vue'
export default {
  name: 'DefaultLayout',
  components: { LoginUserAvatar },
  data () {
    return {
      drawer: false,
      imageURL: ''
    }
  },
  computed: {
    loginUserName () {
      return this.$store.state.user.displayName
    },
    avatars () {
      return this.$store.state.avatars.avatars
    },
    loginUserAvatar () {
      const result = this.avatars.filter((avatar) => {
        return avatar.user_id === this.$store.state.user.uid
      })
      // console.log('loginUserAvatar:', result)
      return result
    }
  },
  mounted () {
    this.$store.dispatch('avatars/init')
    // this.$store.dispatch('blogs/init')
    // this.$store.dispatch('goodReplys/init')
    // this.$store.dispatch('goodReplys/rankingAll')
    // this.$store.dispatch('goodReplys/rankingMonth')
    // this.$store.dispatch('goodReplys/rankingWeek')
    // this.$store.dispatch('goodReplys/rankingAll')
  },
  methods: {
    logout () {
      if (confirm('「ログアウト」しますか？')) {
        this.$store.dispatch('logout')
          .then(() => this.$router.push('/'))
      }
    },
    toUserPage () {
      const id = this.$store.state.user.uid
      const name = this.$store.state.user.displayName
      this.$router.push({ path: '/user_page', query: { userId: id, userName: name } })
    },
    test () {
      console.log('test')
      // this.$store.dispatch('goodReplys/rankingAllReSet')
      // this.$store.dispatch('goodReplys/rankingWeek')
      // console.log('this.$auth.currentUser:', this.$auth.currentUser)
      // console.log('this.loginUserAvatar[0]:', this.loginUserAvatar[0])
      // console.log('this.$store.state.goodReplys:', this.$store.state.goodReplys)
      // this.$store.dispatch('goodReplys/rankingAll')
      // console.log('this.$store.state.goodReplys.goodReplysRankingArraysMonth:', this.$store.state.goodReplys.goodReplysRankingArraysMonth)
      // console.log('this.$store.state.goodReplys.goodReplysCountsArraysAll:', this.$store.state.goodReplys.goodReplysCountsArraysAll)
      // const loginUserPhotoURL = this.$store.state.user.photoURL
      // const avatars = this.avatars
      // const loginavatar = this.loginUserAvatar
      // console.log('this.$auth.currentUser.uid:', this.$auth.currentUser.uid)
      // console.log('this.$auth.currentUser.displayName:', this.$auth.currentUser.displayName)
      // console.log('this.$auth.currentUser.password:', this.$auth.currentUser.password)
      // console.log('this.$store.state.user.password:', this.$store.state.user.password)
      // console.log('this.$store.state.user.uid:', this.$store.state.user.uid)
      // console.log('this.$store.state.user.displayName:', this.$store.state.user.displayName)
      // console.log('loginUserPhotoURL:', loginUserPhotoURL)
      // console.log('this.avatars', this.avatars)
      // console.log('this.loginUserAvatar[0].id:', this.loginUserAvatar[0].id)
      // console.log('this.loginUserAvatar[0].photoURL:', this.loginUserAvatar[0].photoURL)
      // console.log('this.$auth:', this.$auth)
      // console.log('avatars:', avatars)
      // console.log('loginavatar:', loginavatar)
      // const blogs = this.$store.state.blogs.blogs
      // console.log('blogs:', blogs)
      // const result = this.avatars.filter((avatar) => {
      //   return avatar.user_id === this.$store.state.user.uid
      // })
      // console.log('result:', result)
      // const storage = getStorage()
      // const storageLocation = avatar[0].storage_location
      // console.log('storageLocation:', storageLocation)
      // const gsReference = ref(storage, storageLocation)
      // getDownloadURL(gsReference)
      //   .then((url) => {
      //     console.log('test2 url:', url)
      //     console.log('$store.state.user:', this.$store.state.user)
      //     return url
      //   })
      // this.getLoginUserAvatarImage()
    }
  }
}
</script>

<style scoped>

</style>
