import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'

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
    // console.log('avatars init')
    const collectionRef = collection(this.$db, 'avatars')
    // console.log('collectionRef:', collectionRef)
    const q = query(collectionRef, orderBy('user_id', 'desc'))
    // console.log('q:', q)
    onSnapshot(q, (querySnapshot) => {
      commit('setAvatars', querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  },
  signUp (_, { userId, userEmail, userName, userURL }) {
    console.log('signUp @avatars.js')
    console.log('signUpUser @avatars.js', userId, userEmail, userName, userURL)
    const avatar = {
      user_id: userId,
      email: userEmail,
      displayName: userName,
      photoURL: userURL
    }
    console.log('avatar', avatar)
    const collectionRef = collection(this.$db, 'avatars')
    addDoc(collectionRef, avatar)
  },
  add (_, avatar) {
    console.log('avatars add')
    const collectionRef = collection(this.$db, 'avatars')
    addDoc(collectionRef, avatar)
  },
  remove (_, id) {
    const documentRef = doc(this.$db, 'avatars', id)
    deleteDoc(documentRef)
  },
  updateDisplayName (_, { avatarId, avatarName }) {
    console.log('avatars displayName update')
    // console.log('avatarsId:', avatarsId)
    // console.log('avatarPhotoURL:', avatarPhotoURL)
    const documentRef = doc(this.$db, 'avatars', avatarId)
    // console.log('documentRef:', documentRef)
    updateDoc(documentRef, {
      displayName: avatarName
    })
  },
  updatePhotoURL (_, { avatarId, avatarPhotoURL }) {
    console.log('avatars photoURL update')
    // console.log('avatarsId:', avatarsId)
    // console.log('avatarPhotoURL:', avatarPhotoURL)
    const documentRef = doc(this.$db, 'avatars', avatarId)
    // console.log('documentRef:', documentRef)
    updateDoc(documentRef, {
      photoURL: avatarPhotoURL
    })
  },
  updateEmail (_, { avatarId, avatarEmail }) {
    console.log('avatars email update')
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      email: avatarEmail
    })
  },
  updateContent (_, { avatarId, avatarContent }) {
    console.log('avatars content update')
    const documentRef = doc(this.$db, 'avatars', avatarId)
    updateDoc(documentRef, {
      content: avatarContent
    })
  }
  // getLoginUserAvatarImage () {
  //   const storage = getStorage()
  //   const storageLocation = this.loginUserAvatar[0].storage_location
  //   const gsReference = ref(storage, storageLocation)
  //   getDownloadURL(gsReference)
  //     .then((url) => {
  //       console.log('getLoginUserAvatarImage URL:', url)
  //       console.log('$store.state.user:', this.$store.state.user)
  //       return url
  //     })
  // }
}
