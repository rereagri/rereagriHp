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
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const collectionRef = collection(this.$db, 'blogs')
          const q = query(collectionRef, orderBy('created_at', 'desc'))
          const avatars = await this.state.avatars.avatars
          // console.log('avatars:', avatars)
          onSnapshot(q, (querySnapshot) => {
            commit('setBlogs', querySnapshot.docs.map((doc) => {
              // console.log('doc.data()', doc.data())
              const avatar = avatars.filter((avatar) => {
                return avatar.user_id === doc.data().user_id
              })
              // console.log('avatar:', avatar)
              const displayName = avatar[0].displayName
              // console.log('displayName:', displayName)
              const commentDisplayNameArray = []
              if (doc.data().comments) {
                for (let i = 0; i < doc.data().comments.length; i++) {
                  const commentAvatar = avatars.filter((avatar) => {
                    return avatar.user_id === doc.data().comments[i].comment_user_id
                  })
                  const commentDisplayName = commentAvatar[0].displayName
                  // console.log('commentDisplayName:', commentDisplayName)
                  commentDisplayNameArray.push(commentDisplayName)
                }
              }
              // console.log('commentDisplayNameArray:', commentDisplayNameArray)
              return { ...doc.data(), id: doc.id, latestDisplayName: displayName, latestCommentDisplayNameArray: commentDisplayNameArray }
            }))
          })
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 500)
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
    // const newDate = format(new Date(), 'yyyy-MM-dd HH:mm')
    const newDate = new Date()
    getDoc(docRef).then((doc) => {
      const data = doc.data().goodReplys || []
      data.push({
        comment_id: commentObj.comment_id,
        comment_user_id: commentObj.comment_user_id,
        user_id: userId,
        created_at: newDate
      })
      // console.log('data:', data)
      updateDoc(docRef, { goodReplys: data })
    })
  },
  deleteGoodReply (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    getDoc(docRef).then((doc) => {
      const goodReplys = doc.data().goodReplys || []
      const deleteGoodReply = goodReplys.filter((goodReply) => {
        // console.log('goodReply:', goodReply)
        return goodReply.comment_id === commentObj.comment_id && goodReply.user_id === userId
      })
      // console.log('deleteGoodReply[0]:', deleteGoodReply[0])
      updateDoc(docRef, {
        goodReplys: arrayRemove(deleteGoodReply[0])
      })
    })
    // console.log('docRef:', docRef)
    // console.log('commentRef:', commentRef)
    // console.log('userId', userId)
    // const deleteData = {
    //   comment_id: commentObj.comment_id,
    //   comment_user_id: commentObj.comment_user_id,
    //   user_id: userId
    // }
    // // console.log('deleteData:', deleteData)
    // updateDoc(docRef, {
    //   goodReplys: arrayRemove(deleteData)
    // })
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
  },
  addTagIds (_, { blogId, tagIdsArray }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    updateDoc(docRef, {
      tagIds: tagIdsArray
    // getDoc(docRef).then((doc) => {
    //   const data = doc.data().tagIds || []
    //   data.push({
    //     comment_id: commentObj.comment_id,
    //     comment_user_id: commentObj.comment_user_id,
    //     user_id: userId,
    //     created_at: newDate
    //   })
    //   // console.log('data:', data)
    //   updateDoc(docRef, { goodReplys: data })
    // })
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
