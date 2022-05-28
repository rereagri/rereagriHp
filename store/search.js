import { } from 'firebase/firestore'

export const state = () => ({
  searchedItems: '',
  searchedBlogs: '',
  selectedBtn: '',
  selectedBtnToggleIndex: ''
})

export const mutations = {
  setSearchedItems (state, searchedItems) {
    state.searchedItems = searchedItems
  },
  setSearchedBlogs (state, searchedBlogs) {
    state.searchedBlogs = searchedBlogs
  },
  setSelectedBtn (state, selectedBtn) {
    state.selectedBtn = selectedBtn
  },
  setSelectedBtnToggleIndex (state, selectedBtnToggleIndex) {
    state.selectedBtnToggleIndex = selectedBtnToggleIndex
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
      }, 500)
    })
  },
  changeSlectedBtn ({ commit }, pushudeBtn) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await commit('setSelectedBtn', pushudeBtn)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 500)
    })
  },
  changeSlectedBtnToggleIndex ({ commit }, selectingBtnToggleIndex) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await commit('setSelectedBtnToggleIndex', selectingBtnToggleIndex)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 500)
    })
  }
}
