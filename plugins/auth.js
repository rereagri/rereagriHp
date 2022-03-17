export default ({ $auth, store }) => {
  return new Promise((resolve, reject) => {
    $auth.onAuthStateChanged((user) => {
      store.dispatch('setUser', user)
      resolve()
    })
  })
}
