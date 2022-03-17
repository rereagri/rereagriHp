<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="$router.back()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="email" type="email" label="E-mail" :rules="rules.email" />
            <v-text-field v-model="password" type="password" label="Password" :rules="rules.password" />
          </v-form>
        </v-card-text>
        <v-card-text class="warning--text">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <nuxt-link to="/signup">
            Sign up
          </nuxt-link>
          <v-spacer />
          <v-btn large color="primary" @click="login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be more than 8 characters'
        ]
      },
      message: ''
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => this.$router.push('/'))
          .catch(() => (this.message = 'Login failed'))
      }
    }
  }
}
</script>

<style>

</style>
