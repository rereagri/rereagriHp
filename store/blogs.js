import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'

export const state = () => ({
  blogs: []
})

export const mutations = {
  setBlogs (state, blogs) {
    state.blogs = blogs
  }
}

export const actions = {
  init ({ commit }) {
    const collectionRef = collection(this.$db, 'blogs')
    const q = query(collectionRef, orderBy('created_at', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      commit('setBlogs', querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  },
  add (_, blog) {
    const collectionRef = collection(this.$db, 'blogs')
    addDoc(collectionRef, blog)
  },
  remove (_, id) {
    const documentRef = doc(this.$db, 'blogs', id)
    deleteDoc(documentRef)
  }
}
