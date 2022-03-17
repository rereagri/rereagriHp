<template>
  <v-app>
    <v-app-bar app dark color="blue darken-4">
      <v-toolbar-title style="cursor:pointer" @click="$router.push('/')">
        DTM QA
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!$store.getters.isAuthenticated" icon :to="'/login'">
        <v-icon>
          mdi-account-circle
        </v-icon>
      </v-btn>
      <v-btn v-else icon @click="logout">
        {{ $store.state.user.displayName }}
        <v-icon>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
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
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/index'))
    }
  }
}
</script>
