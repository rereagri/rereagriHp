import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export const state = () => ({
  tags: []
})

export const mutations = {
  setTags (state, tags) {
    state.tags = tags
  }
}

export const actions = {
  init ({ commit }) {
    const collectionRef = collection(this.$db, 'tags')
    const q = query(collectionRef, orderBy('tagName', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      commit('setTags', querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }
}
