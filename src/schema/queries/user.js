export default (parent, params, { user, checkAuth }) => {
  checkAuth()

  return user
}
