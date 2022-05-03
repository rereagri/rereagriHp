import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail, getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth'

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

export const mutations = {
  setUser (state, user) {
    if (user) {
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        password: user.password
      }
    } else {
      state.user = null
    }
  }
}

export const actions = {
  setUser ({ commit }, user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setUser', user)
        resolve()
      }, 1000)
    })
  },
  signUp ({ commit }, { email, password, name, url }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(this.$auth, email, password)
          await updateProfile(userCredential.user, { displayName: name, photoURL: url })
          commit('setUser', this.$auth.currentUser)
          console.log('this.$auth.currentUser @index.js', this.$auth.currentUser)
          const signUpUser = this.$auth.currentUser
          this.dispatch('avatars/signUp', { userId: signUpUser.uid, userEmail: signUpUser.email, userName: signUpUser.displayName, userURL: signUpUser.photoURL })
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  login ({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(this.$auth, email, password)
          commit('setUser', userCredential.user)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await signOut(this.$auth)
          commit('setUser', null)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  updateDisplayName ({ commit }, { name }) {
    console.log('Authentication displayName update')
    // console.log('name @index.js:', name)
    // console.log('this.$auth.currentUser:', this.$auth.currentUser)
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await updateProfile(this.$auth.currentUser, { displayName: name })
          commit('setUser', this.$auth.currentUser)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  updatePhotoURL ({ commit }, { url }) {
    console.log('Authentication photoURL update')
    // console.log('photoURL@index.js:', url)
    // console.log('this.$auth.currentUser:', this.$auth.currentUser)
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await updateProfile(this.$auth.currentUser, { photoURL: url })
          commit('setUser', this.$auth.currentUser)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  reauthenticationForUpdateEmail ({ commit }, { currentPassword, newEmail, avatarId }) {
    const auth = getAuth()
    const user = auth.currentUser
    const currentEmail = auth.currentUser.email
    const credential = EmailAuthProvider.credential(
      currentEmail,
      currentPassword
    )
    reauthenticateWithCredential(user, credential).then(() => {
      console.log('reauthentication success!')
      this.dispatch('updateEmail', { email: newEmail, avatarid: avatarId })
    }).catch((error) => {
      console.log(error)
      alert('エラー')
    })
  },
  updateEmail ({ commit }, { email, avatarid }) {
    console.log('Authentication updateEmail', email)
    const auth = getAuth()
    updateEmail(auth.currentUser, email).then(() => {
      this.dispatch('avatars/updateEmail', { avatarId: avatarid, avatarEmail: email })
      commit('setUser', this.$auth.currentUser)
    }).catch((error) => {
      console.log(error)
      alert('エラー')
    })
  },
  updatePassword ({ commit }, { email }) {
    // console.log('email @index.js:', email)
    const auth = getAuth()
    const actionCodeSettings = {
      url: 'http://' + window.location.host
    }
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }
  // updatePhotoUrl2 ({ commit }, { strageUrl }) {
  //   console.log('strageUrl@index:', strageUrl)
  //   const auth = getAuth()
  //   updateProfile(auth.currentUser, { photoUrl: strageUrl }).then(() => {
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   commit('setUser', this.$auth.currentUser)
  // },
  // reauthenticationForUpdateEmail ({ commit }, { currentPassword, newEmail }) {
  //   const auth = getAuth()
  //   const user = auth.currentUser
  //   // TODO(you): prompt the user to re-provide their sign-in credentials
  //   // const credential = promptForCredentials()
  //   const currentEmail = auth.currentUser.email
  //   const credential = EmailAuthProvider.credential(
  //     currentEmail,
  //     currentPassword
  //   )
  //   reauthenticateWithCredential(user, credential).then(() => {
  //     console.log('reauthentication success!')
  //     this.dispatch('updateEmil', { email: newEmail })
  //   }).catch((error) => {
  //     console.log(error)
  //     alert('エラー')
  //   })
  // },
  // updateEmil ({ commit }, { email }) {
  //   console.log('updateEmail', email)
  //   const auth = getAuth()
  //   updateEmail(auth.currentUser, email).then(() => {
  //     this.dispatch('sendEmailVerification')
  //   }).catch((error) => {
  //     console.log(error)
  //     alert('エラー')
  //   })
  // },
  // sendEmailVerification ({ commit }) {
  //   const auth = getAuth()
  //   const actionCodeSettings = {
  //     url: 'http://' + window.location.host
  //   }
  //   sendEmailVerification(auth.currentUser, actionCodeSettings)
  //     .then(() => {
  //       console.log('verification email sended!')
  //     })
  // }
}
