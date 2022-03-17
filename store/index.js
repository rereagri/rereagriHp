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
        displayName: user.displayName
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
  signUp ({ commit }, { email, password, name }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(this.$auth, email, password)
          await updateProfile(userCredential.user, { displayName: name })
          commit('setUser', this.$auth.currentUser)
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
  }
}
