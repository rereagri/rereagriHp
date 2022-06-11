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
          const tags = await this.state.tags.tags
          if (avatars.length) {
            onSnapshot(q, (querySnapshot) => {
              commit('setBlogs', querySnapshot.docs.map((doc) => {
                const avatar = avatars.filter((avatar) => {
                  return avatar.user_id === doc.data().user_id
                })
                // console.log('avatar:', avatar)
                const displayName = avatar[0].displayName
                const commentDisplayNameArray = []
                if (doc.data().comments) {
                  for (let i = 0; i < doc.data().comments.length; i++) {
                    const commentAvatar = avatars.filter((avatar) => {
                      return avatar.user_id === doc.data().comments[i].comment_user_id
                    })
                    const commentDisplayName = commentAvatar[0].displayName
                    commentDisplayNameArray.push(commentDisplayName)
                  }
                }
                const blogTagIdsArray = doc.data().tagIds
                const tagNameArray = []
                if (blogTagIdsArray) {
                  for (let i = 0; i < blogTagIdsArray.length; i++) {
                    const matchedTag = tags.filter((tag) => {
                      return tag.id === blogTagIdsArray[i]
                    })
                    tagNameArray.push(matchedTag[0].tagName)
                  }
                }
                return { ...doc.data(), id: doc.id, latestDisplayName: displayName, latestCommentDisplayNameArray: commentDisplayNameArray, latestTagNameArray: tagNameArray }
              }))
            })
          }
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
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
    const newDate = new Date()
    getDoc(docRef).then((doc) => {
      const data = doc.data().goodReplys || []
      data.push({
        comment_id: commentObj.comment_id,
        comment_user_id: commentObj.comment_user_id,
        user_id: userId,
        created_at: newDate
      })
      updateDoc(docRef, { goodReplys: data })
    })
  },
  deleteGoodReply (_, { blogId, commentObj, userId }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    getDoc(docRef).then((doc) => {
      const goodReplys = doc.data().goodReplys || []
      const deleteGoodReply = goodReplys.filter((goodReply) => {
        return goodReply.comment_id === commentObj.comment_id && goodReply.user_id === userId
      })
      updateDoc(docRef, {
        goodReplys: arrayRemove(deleteGoodReply[0])
      })
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
  },
  addTagIds (_, { blogId, tagIdsArray }) {
    const docRef = doc(this.$db, 'blogs', blogId)
    updateDoc(docRef, {
      tagIds: tagIdsArray
    })
  }
}
