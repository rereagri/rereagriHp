import { } from 'firebase/firestore'

export const state = () => ({
  searchedItems: '',
  searchedBlogs: ''
})

export const mutations = {
  setSearchedItems (state, searchedItems) {
    state.searchedItems = searchedItems
  },
  setSearchedBlogs (state, searchedBlogs) {
    state.searchedBlogs = searchedBlogs
  }
}

export const actions = {
  changeSearchedItems ({ commit }, searchedItems) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await commit('setSearchedItems', searchedItems)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 500)
    })
  },
  changeSearchedBlogs ({ commit }, searchedBlogs) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await commit('setSearchedBlogs', searchedBlogs)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })
  }
}
