<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card>
          <v-toolbar dense dark color="secondary">
            <v-toolbar-title>アカウント設定【製作中】</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="email" type="email" label="E-mail" :rules="rules.email" />
              <v-text-field v-model="password" type="password" label="Password" :rules="rules.password" />
              <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" :rules="rules.confirmPassword" />
              <v-text-field v-model="userName" type="text" label="Your Name" :rules="rules.name" />
              <!-- <v-file-input label="Icon image file" prepend-icon="mdi-camera" @change="selectAvatarImage" /> -->
              <v-file-input label="Icon image file" prepend-icon="mdi-camera" @change="postAvatar" v-if="!loginUserAvatar.length" />
              <v-btn color="secondary" @click="deleteAvatar" v-if="loginUserAvatar.length">
                icon delete
              </v-btn>
              <br><br>
              <div>
                <label>自己紹介</label>
                <quill-editor v-model="selfIntroduction" rows="10" />
              </div>
              <br>
              <div>
                <label>自分の曲紹介</label>
                <quill-editor v-model="musicIntroduction" rows="10" />
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="error--text">
            {{ message }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large color="secondary" @click="register">
              register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { serverTimestamp } from 'firebase/firestore'
export default {
  name: 'SignupPage',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
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
      console.log('loginUserAvatar:', result)
      return result
    }
  },
  methods: {
    register () {
      console.log(this.$store.state.unsubscribe())
      // if (this.$refs.form.validate()) {
      //   //
      //   this.$store.dispatch('signUp', {
      //     email: this.email,
      //     password: this.password,
      //     name: this.userName
      //   }).then(() => this.$router.push('/'))
      //     .catch(err => (this.message = err.message))
      // }
    },
    selectAvatarImage (e) {
    // 選択した画像ファイルを取得
      const file = e
      // refの中身が保存する場所のpathになる
      console.log(file)
      // const storageRef = firebase.storage().ref(file.name)
      // console.log(storageRef)
      // storageRef.put(file)
      const storage = getStorage()
      const storageRef = ref(storage, file.name)
      console.log('storageRef:', storageRef)
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a file for storage!')
      })
      const storagelocation = 'gs://' + storageRef._location.bucket + '/' + storageRef._location.path_
      console.log('storageLocation:', storagelocation)
      this.getAvatarURL(storagelocation)
      // this.$store.dispatch('updatePhotoUrl', {
      //   url: storageUrl
      // }).then().catch(err => (this.message = err.message))
    },
    getAvatarURL (storagelocation) {
      const storage = getStorage()
      // const storageLocation = 'gs://nuxt-blog-3064a.appspot.com/onepiece08_franky.png'
      const storageLocation = storagelocation
      const gsReference = ref(storage, storageLocation)
      getDownloadURL(gsReference)
        .then((url) => {
          console.log('storageUrl:', url)
          this.$store.dispatch('updatePhotoURL', {
            storageURL: url
          }).then().catch()
        })
    },
    postAvatar (e) {
      // storage firestore それぞれから今までのデータを削除
      // if (this.loginUserAvatar.length) {
      //   this.deleteAvatar()
      // }
      // this.deleteAvatar()
      // storage 選択イメージファイルをstorageに保存
      const file = e
      console.log('file:', file)
      const fileName = this.$store.state.user.uid + '_' + file.name
      const storage = getStorage()
      const storageRef = ref(storage, fileName)
      console.log('storageRef:', storageRef)
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a file for storage!')
      })
      // firestore 選択イメージファイルのファイルネーム等をavatarsに保存
      const storagelocation = 'gs://' + storageRef._location.bucket + '/' + storageRef._location.path_
      const avatar = {
        created_at: serverTimestamp(),
        user_id: this.$store.state.user.uid,
        file_name: fileName,
        storage_location: storagelocation
      }
      this.$store.dispatch('avatars/add', avatar).then()
    },
    deleteAvatar () {
      // firestore 現在のイメージファイルネームを取得
      // const avatars = this.$store.state.avatars.avatars
      // const loginUserAvatar = avatars.filter((avatar) => {
      //   return avatar.user_id === this.$store.state.user.uid
      // })
      const loginUserAvatarImageFileName = this.loginUserAvatar[0].file_name
      console.log('loginUserAvatar:', this.loginUserAvatar)
      console.log('loginUserAvatarImageFileName:', loginUserAvatarImageFileName)
      // storage storageからの削除
      // if (this.loginUserAvatar.length) {
      const storage = getStorage()
      const desertRef = ref(storage, loginUserAvatarImageFileName)
      deleteObject(desertRef).then(() => {
      }).catch((error) => {
        console.log(error)
      })
      // firestore avatarsからの削除
      this.$store.dispatch('avatars/remove', this.loginUserAvatar[0].id)
      // }
    }
  }
}
</script>

<style>

</style>
