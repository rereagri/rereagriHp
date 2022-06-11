<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">ユーザー名の設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="displayName" type="text" label="Your Name" :rules="rules.name" />
            </v-form>
            <br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updateDisplayName">
                update your name
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br><br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">アイコンの設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="photoURL" type="text" label="Icon URL" />
            </v-form>
            <br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updatePhotoURL">
                update icon photo
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br><br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">メールアドレスの設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="email" type="email" label="新しいE-mail" :rules="rules.email" />
            <v-text-field v-model="password" type="password" label="現在のPassword" :rules="rules.password" />
            <br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updateEmail">
                update email
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br><br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">パスワードの設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div>パスワードを変更する場合は以下のボタンを押してください。登録されているメールアドレスにパスワードを再設定するためのメールが送信されます。必ず「８文字以上」のパスワードを設定してください。</div>
            <br><br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updatePassword">
                update password
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br><br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">自己紹介・曲紹介</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <div>
                <quill-editor v-model="content" rows="10" />
              </div>
            </v-form>
            <br><br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updateContent">
              content update
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignupPage',
  data () {
    return {
      email: this.$store.state.user.email,
      password: '',
      confirmPassword: '',
      displayName: this.$store.state.user.displayName,
      photoURL: this.$store.state.user.photoURL,
      content: '',
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be more than 8 characters'
        ],
        confirmPassword: [
          v => (v === this.password) || 'Passwords does not match'
        ],
        name: [
          v => !!v || 'Name is required'
        ]
      },
      message: ''
    }
  },
  computed: {
    loginUserEmail () {
      return this.$store.state.user.email
    },
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
    this.content = this.loginUserAvatar[0].content
  },
  methods: {
    updateDisplayName () {
      if (confirm('ハンドルネームを変更しますか？')) {
        this.$store.dispatch('updateDisplayName', { name: this.displayName }).then()
        this.$store.dispatch('avatars/updateDisplayName', { avatarId: this.loginUserAvatar[0].id, avatarName: this.displayName }).then()
      }
    },
    updatePhotoURL () {
      if (confirm('アイコンを変更しますか？')) {
        this.$store.dispatch('updatePhotoURL', { url: this.photoURL }).then()
        this.$store.dispatch('avatars/updatePhotoURL', { avatarId: this.loginUserAvatar[0].id, avatarPhotoURL: this.photoURL }).then()
      }
    },
    updateEmail () {
      if (confirm('メールアドレスを変更しますか？')) {
        this.$store.dispatch('reauthenticationForUpdateEmail', { currentPassword: this.password, newEmail: this.email, avatarId: this.loginUserAvatar[0].id }).then()
      }
    },
    updatePassword () {
      if (confirm('パスワードを再設定するメールを登録されているメールアドレスに送信しますか？')) {
        this.$store.dispatch('updatePassword', { email: this.loginUserAvatar[0].email }).then()
      }
    },
    updateContent () {
      if (confirm('自己紹介・曲紹介の内容を変更しますか？')) {
        this.$store.dispatch('avatars/updateContent', { avatarId: this.loginUserAvatar[0].id, avatarContent: this.content }).then()
      }
    }
  }
}
</script>

<style>

</style>
