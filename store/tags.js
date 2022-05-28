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
    // console.log('tags init')
    const collectionRef = collection(this.$db, 'tags')
    // console.log('collectionRef:', collectionRef)
    const q = query(collectionRef, orderBy('tagName', 'desc'))
    // console.log('q:', q)
    onSnapshot(q, (querySnapshot) => {
      commit('setTags', querySnapshot.docs.map((doc) => {
        // console.log('doc.data():', doc.data())
        return { ...doc.data(), id: doc.id }
      }))
    })
  }
  // add (_, tag) {
  //   console.log('tags add')
  //   const collectionRef = collection(this.$db, 'tags')
  //   addDoc(collectionRef, tag)
  // },
  // remove (_, id) {
  //   const documentRef = doc(this.$db, 'tags', id)
  //   deleteDoc(documentRef)
  // }
}
