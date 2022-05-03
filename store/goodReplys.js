import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export const state = () => ({
  goodReplys: [],
  goodReplysRankingArraysAll: [],
  goodReplysCountsArrays: []
})

export const mutations = {
  // setGoodReplys (state, goodReplys) {
  //   state.goodReplys = goodReplys
  // }
  setGoodReplys (state, data) {
    state.goodReplys = []
    // console.log('data:', data)
    for (let i = 0; i < data.length; i++) {
      for (let t = 0; t < data[i].length; t++) {
        state.goodReplys.push(data[i][t])
      }
      // state.goodReplys.push(data[i])
    }
    // state.goodReplys = data
    // state.goodReplys.push(data)
    // state.goodReplys.concat(data)
  },
  setGoodReplysRankingArraysAll (state, data) {
    // console.log('data:', data)
    state.goodReplysRankingArraysAll = data
  },
  setGoodReplysCountsArrays (state, data) {
    state.goodReplysCountsArrays = data
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
    console.log('counts:', counts)
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
    commit('setGoodReplysCountsArrays', goodReplysCountsArrays)
  }
}
