import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const state = () => ({
  avatars: []
})

export const mutations = {
  setAvatars (state, avatars) {
    state.avatars = avatars
  }
}

export const actions = {
  init ({ commit }) {
    console.log('abatars init')
    const collectionRef = collection(this.$db, 'avatars')
    console.log('collectionRef:', collectionRef)
    const q = query(collectionRef, orderBy('created_at', 'desc'))
    console.log('q:', q)
    onSnapshot(q, (querySnapshot) => {
      commit('setAvatars', querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  },
  add (_, avatar) {
    const collectionRef = collection(this.$db, 'avatars')
    addDoc(collectionRef, avatar)
  },
  remove (_, id) {
    const documentRef = doc(this.$db, 'avatars', id)
    deleteDoc(documentRef)
  },
  update (_, { id, location }) {
    const documentRef = doc(this.$db, id)
    updateDoc(documentRef, {
      storageLocation: location
    })
  },
  getLoginUserAvatarImage () {
    const storage = getStorage()
    const storageLocation = this.loginUserAvatar[0].storage_location
    const gsReference = ref(storage, storageLocation)
    getDownloadURL(gsReference)
      .then((url) => {
        console.log('getLoginUserAvatarImage URL:', url)
        console.log('$store.state.user:', this.$store.state.user)
        return url
      })
  }
}
