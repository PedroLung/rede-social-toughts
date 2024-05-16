const Tought = require('../models/Tought') // Importando o model de Toughts
const User   = require('../models/User') // Importando o model de User

module.exports = class ToughtsController {
  static async showToughts(req, res) {
    res.render('toughts/home')
  }
}