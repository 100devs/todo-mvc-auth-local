export const getIndex = (req, res) => {
  res.render('index', { user: req.user })
}
