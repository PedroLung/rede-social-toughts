// Middleware para saber se o usuario pode seguir com a requisição ou não
module.exports.checkAuth = function(req, res, next) {
  const userId = req.session.userid

  if(!userId){
    res.redirect('/login')
  }

  next()
}