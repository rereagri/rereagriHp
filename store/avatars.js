import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'

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
    const collectionRef = collection(this.$db, 'avatars')
    const q = query(collectionRef, orderBy('user_id', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      commit('setAvatars', querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  },
  signUp (_, { userId, userEmail, userName, userURL }) {
    const avatar = {
      user_id: userId,
      email: userEmail,
      displayName: userName,
      photoURL: userURL
    }
    const collectionRef = collection(this.$db, 'avatars')
    addDoc(collectionRef, avatar)
  },
  add (_, avatar) {
    const collectionRef = collection(this.$db, 'avatars')
    addDoc(collectionRef, avatar)
  },
  remove (_, id) {
    const documentRef = doc(this.$db, 'avatars', id)
    deleteDoc(documentRef)
  },
  updateDisplayName (_, { avatarId, avatarName }) {
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      displayName: avatarName
    })
  },
  updatePhotoURL (_, { avatarId, avatarPhotoURL }) {
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      photoURL: avatarPhotoURL
    })
  },
  updateEmail (_, { avatarId, avatarEmail }) {
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      email: avatarEmail
    })
  },
  updateContent (_, { avatarId, avatarContent }) {
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      content: avatarContent
    })
  }
}
