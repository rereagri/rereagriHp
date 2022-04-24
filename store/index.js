import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

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
  }
  // updatePhotoUrl2 ({ commit }, { strageUrl }) {
  //   console.log('strageUrl@index:', strageUrl)
  //   const auth = getAuth()
  //   updateProfile(auth.currentUser, { photoUrl: strageUrl }).then(() => {
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   commit('setUser', this.$auth.currentUser)
  // }
}
