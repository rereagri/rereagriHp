import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, arrayRemove, getDoc } from 'firebase/firestore'

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
  },
  removeComment (_, { blogId, commentObj, commentsIndex }) {
    const documentRef = doc(this.$db, 'blogs', blogId)
    updateDoc(documentRef, {
      comments: arrayRemove(commentObj)
    })
  },
  addGoodReply (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    // const indexStr = String(commentsIndex)
    // const commentRef = doc(this.$db, 'blogs', blogId, 'comments', indexStr)
    // console.log('docRef:', docRef)
    // console.log('commentRef:', commentRef)
    // console.log('userId', userId)
    getDoc(docRef).then((doc) => {
      const data = doc.data().goodReplys || []
      data.push({
        comment_id: commentObj.comment_id,
        user_id: userId
      })
      // console.log('data:', data)
      updateDoc(docRef, { goodReplys: data })
    })
  },
  deleteGoodReply (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    // console.log('docRef:', docRef)
    // console.log('commentRef:', commentRef)
    // console.log('userId', userId)
    const deleteData = {
      comment_id: commentObj.comment_id,
      user_id: userId
    }
    // console.log('deleteData:', deleteData)
    updateDoc(docRef, {
      goodReplys: arrayRemove(deleteData)
    })
  },
  beBestAnswer (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    updateDoc(docRef, {
      bestAnswer: {
        comment_id: commentObj.comment_id,
        user_id: userId
      }
    })
  },
  deleteBestAnswer (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    updateDoc(docRef, {
      bestAnswer: ''
    })
  }
}

// updateDoc(commentRef, {
//   comment_good_reply: arrayUnion(userId)
// })
// updateDoc(documentRef, {
//   comments: { 0: { comment_good_reply_user_id: arrayUnion(userId) } }
// })
// updateDoc(docRef, {
//   [`comments[${commentsIndex}]`]: arrayUnion(userId)
// })
// updateDoc(doc(this.$db, 'blogs', blogId, 'comments', indexStr), {
//   comment_good_reply: arrayUnion(userId)
// })
// updateDoc(documentRef, {
//   [`comments[${indexStr}].comment_good_reply`]: arrayUnion(userId)
// })
// updateDoc(documentRef, {
//   [`comments.${commentsIndex}`]: { comment_good_reply: arrayUnion(userId) }
// })
// getDoc(docRef).then((doc) => {
//   const data = doc.data().comments[`${commentsIndex}`].comment_good_reply || []
//   console.log('data:', data)
//   data.push({
//     user_id: userId
//   })
//   console.log('data2:', data)
//   updateDoc(docRef, { comments: data })
// })
