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
          {{ $store.state.user.displayName }}
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
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ loginUserName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="$router.push('/user_page')">
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
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ログアウト</v-list-item-title>
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
          <span style="cursor:pointer" class="mx-2" @click="$router.push('/policy')">利用規約・プライバシーポリシー</span>
          <br>
          <span style="cursor:pointer" class="mx-2" @click="$router.push('/about')">DTM QAとは・お知らせ</span>
          <br>
          <span style="cursor:pointer" @click="$router.push('/')">&copy; Copyright DTM QA All Rights {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    loginUserName () {
      return this.$store.state.user.displayName
    }
  },
  methods: {
    logout () {
      if (confirm('「ログアウト」しますか？')) {
        this.$store.dispatch('logout')
          .then(() => this.$router.push('/'))
      }
    }
  }
}
</script>

<style scoped>
  .pointer-events-none {
  pointer-events: none
  }
</style>
