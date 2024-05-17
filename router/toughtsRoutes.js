const express = require('express') // Importando o express
const router  = express.Router() // Colocando todos os métodos do express para rotas na constante router
// Controller
const ToughtsController = require('../controllers/ToughtsController')

// Helpers
const checkAuth = require('../helpers/auth').checkAuth

// Rotas
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/add', checkAuth, ToughtsController.createTought)
router.post('/add', checkAuth, ToughtsController.createToughtSave)
router.get('/edit/:id', checkAuth, ToughtsController.updateTought)
router.post('/edit', checkAuth, ToughtsController.updateToughtSave)
router.get('/', ToughtsController.showToughts)

module.exports = router