const express = require('express') // Importando o express
const router  = express.Router() // Colocando todos os métodos do express para rotas na constante router
// Controller
const AuthController = require('../controllers/AuthController')

// Rotas
router.get('/login', AuthController.login)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.get('/logout', AuthController.logout)

module.exports = router