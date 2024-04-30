<template>
  <v-app>
    <v-app-bar app dark color="green darken-4">
      <v-toolbar-title style="cursor:pointer" @click="$router.push('/')">
        REREAGRI
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-btn v-if="!$store.getters.isAuthenticated" icon :to="'/login'">
        <v-icon>
          mdi-account-circle
        </v-icon>
      </v-btn> -->
      <div v-if="$store.getters.isAuthenticated">
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
            <v-list-item @click="$router.push('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ホーム</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/blog')">
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ブログ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/aboutRereagri')">
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>リリアグリについて</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click="toUserPage">
              <v-list-item-icon>
                <v-icon>mdi-card-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ユーザーページ</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item @click="$router.push('/account_settings')">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>アカウント設定</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click="$router.push('/user_ranking')">
              <v-list-item-icon>
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ユーザーランキング</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item @click="toMail">
              <v-list-item-icon>
                <v-icon>mdi-email-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  運営へのメール
                </v-list-item-title>
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
            <!-- <v-list-item @click="test">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>各種テスト</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-navigation-drawer>
      </div>
      <div v-if="!$store.getters.isAuthenticated">
        <v-btn text class="px-1 pointer-events-none">
          Customer
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
              <!-- <v-btn icon :to="'/login'"> -->
              <v-btn icon>
                <v-icon>
                  mdi-account-circle
                </v-icon>
              </v-btn>
              <v-list-item-content>
                <v-list-item-title>Customer</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="$router.push('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ホーム</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/blog')">
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ブログ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('/aboutRereagri')">
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>リリアグリについて</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click="$router.push('/user_ranking')">
              <v-list-item-icon>
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ユーザーランキング</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item @click="toMail">
              <v-list-item-icon>
                <v-icon>mdi-email-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>運営へのメール</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="'/login'">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>管理者用</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click="test">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>各種テスト</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app dark color="green darken-4">
      <v-row class="text-center text-caption">
        <v-col>
          <span class="pointer mx-2" @click="$router.push('/policy')">利用規約/個人情報の取扱い</span>
          <br>
          <!-- <span class="pointer mx-2" @click="$router.push('/about')">DTM QAとは・お知らせ</span>
          <br> -->
          <span class="pointer" @click="$router.push('/')">&copy; Copyright 一般社団法人リリアグリ All Rights {{ new Date().getFullYear() }}</span>
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
      return result
    }
  },
  mounted () {
    this.$store.dispatch('blogs/init')
    this.$store.dispatch('avatars/init')
    this.$store.dispatch('goodReplys/init')
    this.$store.dispatch('tags/init')
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
    toMail () {
      location.href = 'mailto:rereagri@gmail.com'
    },
    isLogin () {
      return this.$store.getters.isAuthenticated
    },
    test () {
      console.log('test')
      // const blogs = this.$store.state.blogs.blogs
      // console.log('blogs:', blogs)
    }
  }
}
</script>

<style scoped>

</style>
