export default ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && !['index', 'login', 'signup', 'policy', 'about', 'question_card_detail', 'user_ranking', 'user_page', 'blog', 'aboutRereagri'].includes(route.name)) {
    redirect('/login')
  }
  if (store.getters.isAuthenticated && ['login', 'signup'].includes(route.name)) {
    redirect('/')
  }
}
