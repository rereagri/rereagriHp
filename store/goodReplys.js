import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export const state = () => ({
  goodReplys: [],
  goodReplysRankingArraysAll: [],
  goodReplysCountsArraysAll: [],
  goodReplysRankingArraysMonth: [],
  goodReplysCountsArraysMonth: [],
  goodReplysRankingArraysWeek: [],
  goodReplysCountsArraysWeek: []
})

export const mutations = {
  setGoodReplys (state, data) {
    state.goodReplys = []
    for (let i = 0; i < data.length; i++) {
      for (let t = 0; t < data[i].length; t++) {
        state.goodReplys.push(data[i][t])
      }
    }
  },
  setGoodReplysRankingArraysAll (state, data) {
    state.goodReplysRankingArraysAll = data
  },
  setGoodReplysCountsArraysAll (state, data) {
    state.goodReplysCountsArraysAll = data
  },
  setGoodReplysRankingArraysMonth (state, data) {
    state.goodReplysRankingArraysMonth = data
  },
  setGoodReplysCountsArraysMonth (state, data) {
    state.goodReplysCountsArraysMonth = data
  },
  setGoodReplysRankingArraysWeek (state, data) {
    state.goodReplysRankingArraysWeek = data
  },
  setGoodReplysCountsArraysWeek (state, data) {
    state.goodReplysCountsArraysWeek = data
  }
}

export const actions = {
  init ({ commit }) {
    const collectionRef = collection(this.$db, 'blogs')
    const q = query(collectionRef, orderBy('created_at', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      commit('setGoodReplys', querySnapshot.docs.map((doc) => {
        const goodReplysArray = doc.data().goodReplys
        return goodReplysArray
      }))
    })
  },
  rankingAll ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const counts = {}
          const goodReplysRankingArrays = []
          const goodReplysCountsArrays = []
          const goodReplys = this.state.goodReplys.goodReplys
          const avatars = this.state.avatars.avatars
          for (let i = 0; i < goodReplys.length; i++) {
            const goodRepliedUserId = goodReplys[i].comment_user_id
            counts[goodRepliedUserId] = counts[goodRepliedUserId] ? counts[goodRepliedUserId] + 1 : 1
          }
          for (const goodRepliedUserId in counts) {
            const avatar = avatars.filter((avatar) => {
              return avatar.user_id === goodRepliedUserId
            })
            const obj = { goodedUserId: goodRepliedUserId, displayName: avatar[0].displayName, goodReplyCounts: counts[goodRepliedUserId] }
            goodReplysRankingArrays.push(obj)
            goodReplysCountsArrays.push(counts[goodRepliedUserId])
          }
          const data = goodReplysRankingArrays.sort((a, b) => {
            return b.goodReplyCounts - a.goodReplyCounts
          })
          await commit('setGoodReplysRankingArraysAll', data)
          await commit('setGoodReplysCountsArraysAll', goodReplysCountsArrays)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  rankingMonth ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const counts = {}
          const goodReplysRankingArrays = []
          const goodReplysCountsArrays = []
          const goodReplys = this.state.goodReplys.goodReplys
          const now = new Date()
          const beforeTime = now.setMonth(now.getMonth() - 1)
          const salectedGoodReplys = goodReplys.filter((goodReply) => {
            return goodReply.created_at.toDate() >= new Date(beforeTime)
          })
          const avatars = this.state.avatars.avatars
          for (let i = 0; i < salectedGoodReplys.length; i++) {
            const goodRepliedUserId = salectedGoodReplys[i].comment_user_id
            counts[goodRepliedUserId] = counts[goodRepliedUserId] ? counts[goodRepliedUserId] + 1 : 1
          }
          for (const goodRepliedUserId in counts) {
            const avatar = avatars.filter((avatar) => {
              return avatar.user_id === goodRepliedUserId
            })
            const obj = { goodedUserId: goodRepliedUserId, displayName: avatar[0].displayName, goodReplyCounts: counts[goodRepliedUserId] }
            goodReplysRankingArrays.push(obj)
            goodReplysCountsArrays.push(counts[goodRepliedUserId])
          }
          const data = goodReplysRankingArrays.sort((a, b) => {
            return b.goodReplyCounts - a.goodReplyCounts
          })
          await commit('setGoodReplysRankingArraysMonth', data)
          await commit('setGoodReplysCountsArraysMonth', goodReplysCountsArrays)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  },
  rankingWeek ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const counts = {}
          const goodReplysRankingArrays = []
          const goodReplysCountsArrays = []
          const goodReplys = this.state.goodReplys.goodReplys
          const now = new Date()
          const beforeTime = now.setDate(now.getDate() - 7)
          const salectedGoodReplys = goodReplys.filter((goodReply) => {
            return goodReply.created_at.toDate() >= new Date(beforeTime)
          })
          const avatars = this.state.avatars.avatars
          for (let i = 0; i < salectedGoodReplys.length; i++) {
            const goodRepliedUserId = salectedGoodReplys[i].comment_user_id
            counts[goodRepliedUserId] = counts[goodRepliedUserId] ? counts[goodRepliedUserId] + 1 : 1
          }
          for (const goodRepliedUserId in counts) {
            const avatar = avatars.filter((avatar) => {
              return avatar.user_id === goodRepliedUserId
            })
            const obj = { goodedUserId: goodRepliedUserId, displayName: avatar[0].displayName, goodReplyCounts: counts[goodRepliedUserId] }
            goodReplysRankingArrays.push(obj)
            goodReplysCountsArrays.push(counts[goodRepliedUserId])
          }
          const data = goodReplysRankingArrays.sort((a, b) => {
            return b.goodReplyCounts - a.goodReplyCounts
          })
          await commit('setGoodReplysRankingArraysWeek', data)
          await commit('setGoodReplysCountsArraysWeek', goodReplysCountsArrays)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  }
}
