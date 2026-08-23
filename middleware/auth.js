export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/login')
}

export const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/todos')
}
