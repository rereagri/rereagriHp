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
    // console.log('data:', data)
    for (let i = 0; i < data.length; i++) {
      for (let t = 0; t < data[i].length; t++) {
        state.goodReplys.push(data[i][t])
      }
    }
  },
  setGoodReplysRankingArraysAll (state, data) {
    // console.log('data:', data)
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
        // console.log('doc.data():', doc.data())
        const goodReplysArray = doc.data().goodReplys
        // console.log('goodReplysArray:', goodReplysArray)
        return goodReplysArray
      }))
    })
  },
  rankingAll ({ commit }) {
    const counts = {}
    const goodReplysRankingArrays = []
    const goodReplysCountsArrays = []
    // console.log('goodReplys test:', this.state.goodReplys.goodReplys)
    const goodReplys = this.state.goodReplys.goodReplys
    const avatars = this.state.avatars.avatars
    // const goodReplysRankingArrays = []
    for (let i = 0; i < goodReplys.length; i++) {
      // console.log('goodReplys[i]:', goodReplys[i])
      const goodRepliedUserId = goodReplys[i].comment_user_id
      counts[goodRepliedUserId] = counts[goodRepliedUserId] ? counts[goodRepliedUserId] + 1 : 1
    }
    // console.log('counts:', counts)
    for (const goodRepliedUserId in counts) {
      const avatar = avatars.filter((avatar) => {
        return avatar.user_id === goodRepliedUserId
      })
      // console.log('avatar:', avatar)
      const obj = { goodedUserId: goodRepliedUserId, displayName: avatar[0].displayName, goodReplyCounts: counts[goodRepliedUserId] }
      goodReplysRankingArrays.push(obj)
      goodReplysCountsArrays.push(counts[goodRepliedUserId])
    }
    // console.log('counts:', counts)
    // console.log('goodReplysRankingArrays:', goodReplysRankingArrays)
    const data = goodReplysRankingArrays.sort((a, b) => {
      return b.goodReplyCounts - a.goodReplyCounts
    })
    // console.log('data:', data)
    commit('setGoodReplysRankingArraysAll', data)
    commit('setGoodReplysCountsArraysAll', goodReplysCountsArrays)
  },
  rankingMonth ({ commit }) {
    const counts = {}
    const goodReplysRankingArrays = []
    const goodReplysCountsArrays = []
    const goodReplys = this.state.goodReplys.goodReplys
    const now = new Date()
    const beforeTime = now.setMonth(now.getMonth() - 1)
    // const beforeTime = now.setDate(now.getDate() - 1)
    // console.log('beforeTime:', beforeTime)
    // console.log('new Date(beforeTime):', new Date(beforeTime))
    const salectedGoodReplys = goodReplys.filter((goodReply) => {
      // console.log('goodReply.created_at:', goodReply.created_at)
      // console.log('new Date(goodReply.created_at)', new Date(goodReply.created_at))
      // console.log('goodReply.created_at.toDate()', goodReply.created_at.toDate())
      return goodReply.created_at.toDate() >= new Date(beforeTime)
    })
    // console.log('datet1MonthBeforeFromNow.toDate():', datet1MonthBeforeFromNow.toDate())
    // console.log('salectedGoodReplys:', salectedGoodReplys)
    const avatars = this.state.avatars.avatars
    for (let i = 0; i < salectedGoodReplys.length; i++) {
      const goodRepliedUserId = salectedGoodReplys[i].comment_user_id
      counts[goodRepliedUserId] = counts[goodRepliedUserId] ? counts[goodRepliedUserId] + 1 : 1
    }
    // console.log('counts:', counts)
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
    commit('setGoodReplysRankingArraysMonth', data)
    commit('setGoodReplysCountsArraysMonth', goodReplysCountsArrays)
  },
  rankingWeek ({ commit }) {
    const counts = {}
    const goodReplysRankingArrays = []
    const goodReplysCountsArrays = []
    const goodReplys = this.state.goodReplys.goodReplys
    const now = new Date()
    const beforeTime = now.setDate(now.getDate() - 7)
    // console.log('new Date(beforeTime):', new Date(beforeTime))
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
    commit('setGoodReplysRankingArraysWeek', data)
    commit('setGoodReplysCountsArraysWeek', goodReplysCountsArrays)
  }
  // rankingAllReSet ({ commit }) {
  //   console.log('rankingAllReSet')
  //   const goodReplysRankingArraysAll = this.state.goodReplys.goodReplysRankingArraysAll
  //   console.log('goodReplysRankingArraysAll', goodReplysRankingArraysAll)
  //   const goodReplysCountsArraysAll = this.state.goodReplys.goodReplysCountsArraysAll
  //   for (let i = 0; i < goodReplysRankingArraysAll.length; i++) {
  //     console.log('goodReplysRankingArraysAll[i]', goodReplysRankingArraysAll[i])
  //     const rank = this.rankSet(goodReplysRankingArraysAll[i].goodReplyCounts, goodReplysCountsArraysAll, 0)
  //     console.log('rank:', rank)
  //   }
  // },
  // rankSet (_, { value, arrs, updown }) {
  //   if (typeof (updown) === 'undefined') {
  //     updown = 0
  //   }
  //   const sign = updown === 0 ? 1 : -1
  //   let thisrank = 1
  //   const arrayLength = arrs.length
  //   for (let i = 0; i < arrayLength; i++) {
  //     if (sign * (arrs[i] - value) > 0) {
  //       thisrank++
  //     }
  //   }
  //   return thisrank
  // }
}
