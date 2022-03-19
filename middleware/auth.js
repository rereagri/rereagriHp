export default ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && !['index', 'login', 'signup', 'policy', 'about', 'mark-down'].includes(route.name)) {
    redirect('/login')
  }
  if (store.getters.isAuthenticated && ['login', 'signup'].includes(route.name)) {
    redirect('/')
  }
}
