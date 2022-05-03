<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">YourName（ハンドルネーム）の設定</v-toolbar-title>
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
        <br><br>
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
        <br><br>
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">メールアドレスの設定</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- <div>emailは変更できません</div> -->
            <!-- <div>メールアドレスを変更した場合、変更後の新しいメールアドレスに「メールアドレスの確認」のメールが送付されます。変更前の古いメールアドレスにはメールアドレスが変更されたことのお知らせメールが送付されます。</div> -->
            <!-- <br> -->
            <v-text-field v-model="email" type="email" label="新しいE-mail" :rules="rules.email" />
            <v-text-field v-model="password" type="password" label="現在のPassword" :rules="rules.password" />
            <!-- <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" :rules="rules.confirmPassword" /> -->
            <br>
            <v-row justify="center">
              <v-btn large color="secondary" @click="updateEmail">
                update email
              </v-btn>
            </v-row>
            <br>
          </v-card-text>
        </v-card>
        <br><br>
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
        <br><br>
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
        <br>
        <!-- <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title class="mx-auto">アカウント設定【製作中】</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="displayName" type="text" label="Your Name" :rules="rules.name" />
              <v-btn large color="secondary" @click="updateDisplayName">
                update your name
              </v-btn>
            </v-form>
            <br>
            <v-form>
              <v-text-field v-model="photoURL" type="text" label="Icon URL" />
            </v-form>
            <v-btn large color="secondary" @click="updatePhotoURL">
              update icon photo
            </v-btn>
            <br><br><br>
            <div>変更前のメールアドレスに、新しいメールに変更されたことのお知らせのメールが送付されます。</div>
            <v-text-field v-model="email" type="email" label="新しいE-mail" :rules="rules.email" />
            <v-text-field v-model="password" type="password" label="現在のPassword" :rules="rules.password" />
            <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" :rules="rules.confirmPassword" />
            <v-btn large color="secondary" @click="updateEmail">
              update email
            </v-btn>
            <br><br>
            <div>パスワードを変更する場合は以下のボタンを押してください。登録されているメールアドレスにパスワードを再設定するためのメールが送信されます。</div>
            <v-btn large color="secondary" @click="updatePassword">
              update password
            </v-btn>
            <br><br>
            <v-form>
              <div>
                <label>自己紹介・曲紹介</label>
                <quill-editor v-model="content" rows="10" />
              </div>
              <br>
              <v-btn large color="secondary" @click="updateContent">
              content update
            </v-btn>
            </v-form>
          </v-card-text>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getStorage, ref, deleteObject } from 'firebase/storage'
// import { serverTimestamp } from 'firebase/firestore'
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
      // console.log('loginUserAvatar:', result)
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
    // register () {
    //   console.log(this.$store.state.unsubscribe())
    // if (this.$refs.form.validate()) {
    //   //
    //   this.$store.dispatch('signUp', {
    //     email: this.email,
    //     password: this.password,
    //     name: this.userName
    //   }).then(() => this.$router.push('/'))
    //     .catch(err => (this.message = err.message))
    // }
    // }
    // selectAvatarImage (e) {
    // // 選択した画像ファイルを取得
    //   const file = e
    //   // refの中身が保存する場所のpathになる
    //   console.log(file)
    //   // const storageRef = firebase.storage().ref(file.name)
    //   // console.log(storageRef)
    //   // storageRef.put(file)
    //   const storage = getStorage()
    //   const storageRef = ref(storage, file.name)
    //   console.log('storageRef:', storageRef)
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a file for storage!')
    //   })
    //   const storagelocation = 'gs://' + storageRef._location.bucket + '/' + storageRef._location.path_
    //   console.log('storageLocation:', storagelocation)
    //   this.getAvatarURL(storagelocation)
    //   // this.$store.dispatch('updatePhotoUrl', {
    //   //   url: storageUrl
    //   // }).then().catch(err => (this.message = err.message))
    // },
    // getAvatarURL (storagelocation) {
    //   const storage = getStorage()
    //   // const storageLocation = 'gs://nuxt-blog-3064a.appspot.com/onepiece08_franky.png'
    //   const storageLocation = storagelocation
    //   const gsReference = ref(storage, storageLocation)
    //   getDownloadURL(gsReference)
    //     .then((url) => {
    //       console.log('storageUrl:', url)
    //       this.$store.dispatch('updatePhotoURL', {
    //         storageURL: url
    //       }).then().catch()
    //     })
    // },
    // postAvatar (e) {
    //   // storage firestore それぞれから今までのデータを削除
    //   // if (this.loginUserAvatar.length) {
    //   //   this.deleteAvatar()
    //   // }
    //   // this.deleteAvatar()
    //   // storage 選択イメージファイルをstorageに保存
    //   const file = e
    //   console.log('file:', file)
    //   const fileName = this.$store.state.user.uid + '_' + file.name
    //   const storage = getStorage()
    //   const storageRef = ref(storage, fileName)
    //   console.log('storageRef:', storageRef)
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a file for storage!')
    //   })
    //   // firestore 選択イメージファイルのファイルネーム等をavatarsに保存
    //   const storagelocation = 'gs://' + storageRef._location.bucket + '/' + storageRef._location.path_
    //   const avatar = {
    //     created_at: serverTimestamp(),
    //     user_id: this.$store.state.user.uid,
    //     file_name: fileName,
    //     storage_location: storagelocation
    //   }
    //   this.$store.dispatch('avatars/add', avatar).then()
    // },
    // deleteAvatar () {
    //   // firestore 現在のイメージファイルネームを取得
    //   // const avatars = this.$store.state.avatars.avatars
    //   // const loginUserAvatar = avatars.filter((avatar) => {
    //   //   return avatar.user_id === this.$store.state.user.uid
    //   // })
    //   const loginUserAvatarImageFileName = this.loginUserAvatar[0].file_name
    //   console.log('loginUserAvatar:', this.loginUserAvatar)
    //   console.log('loginUserAvatarImageFileName:', loginUserAvatarImageFileName)
    //   // storage storageからの削除
    //   // if (this.loginUserAvatar.length) {
    //   const storage = getStorage()
    //   const desertRef = ref(storage, loginUserAvatarImageFileName)
    //   deleteObject(desertRef).then(() => {
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    //   // firestore avatarsからの削除
    //   this.$store.dispatch('avatars/remove', this.loginUserAvatar[0].id)
    //   // }
    // },
  }
}
</script>

<style>

</style>
