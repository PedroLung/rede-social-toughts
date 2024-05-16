const express = require('express') // Importando o express
const router  = express.Router() // Colocando todos os métodos do express para rotas na constante router
// Controller
const ToughtsController = require('../controllers/ToughtsController')

// Rotas
router.get('/', ToughtsController.showToughts)

module.exports = router