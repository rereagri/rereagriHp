export default ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && !['login', 'signup', 'policy', 'about'].includes(route.name)) {
    redirect('/login')
  }
  if (store.getters.isAuthenticated && ['login', 'signup'].includes(route.name)) {
    redirect('/')
  }
}
