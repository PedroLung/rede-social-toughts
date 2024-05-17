const Tought = require('../models/Tought') // Importando o model de Toughts
const User   = require('../models/User') // Importando o model de User

// Operador para realizar uma busca de filtro
const { Op } = require('sequelize')

module.exports = class ToughtsController {
  static async showToughts(req, res) {
    // resgatar os dados da pesquisa
    let search = ''

    if(req.query.search){
      search = req.query.search
    }

    // Filtro por ordenação de tempo de criação
    let order = 'DESC'

    if(req.query.order === 'old') {
      order = 'ASC'
    } else {
      order = 'DESC'
    }
    // Achar todos os pensamentos
    const toughtsData = await Tought.findAll({
      include: User, 
      where: {
        title: { [Op.like]: `%${search}%` }
      },
      order: [['createdAt', order]]
    })

    // Tratamento do tought
    const toughts = toughtsData.map((result) => result.get({plain: true})) // Vir apenas as informações importantes

    // Contador de quantos pensamentos filtrados foram encontrados
    const toughtsQty = toughts.length

    if (toughtsQty === 0) {
      toughtsQty = false
    }

    res.render('toughts/home', {toughts, search, toughtsQty})
  }

  static async dashboard(req, res) {
    const userId = req.session.userid
   
    const user = await User.findOne({ where: {id: userId}, include: Tought, plain: true })
     // Check se o usuario existe
    if (!user) {
      res.redirect('/login')
    }
    // Organizar o recebimento de dados
    const toughts = user.Toughts.map((result) => result.dataValues) // Pegar só os valores importantes

    // Verificar se a dashboard está vazia:
    let emptyToughts = true

    console.log('Antes', emptyToughts)

    if(toughts.length > 0) {
      emptyToughts = false
    }

    console.log(toughts)
    console.log('Depois', emptyToughts)

    res.render('toughts/dashboard', { toughts, emptyToughts })
  }

  static createTought(req, res) {
    res.render('toughts/create')
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid
    }

    try {
      await Tought.create(tought)
      req.flash('message', 'Pensamento Criado com sucesso!')

      req.session.save(() => {
        res.redirect('/toughts/dashboard')
    })
    } catch (err) {
      console.log(`Erro inesperado: ${err}`)
    }
  }

  static async removeTought(req, res) {
    const id = req.body.id
    const userId = req.session.userid

    try {
      await Tought.destroy({where: {id: id}, userid: userId})

      req.flash('message', 'Pensamento removido com sucesso!')

      res.redirect('/toughts/dashboard')
    } catch(err) {
      console.log(`Erro inesperado: ${err}`)
    }
  }

  static async updateTought(req, res) {
    const id = req.params.id

    const tought = await Tought.findOne({where: {id: id}, raw: true})

    res.render('toughts/edit', {tought})
  }

  static async updateToughtSave(req, res) {
    const id = req.body.id

    const tought = {
      title: req.body.title
    }

    try {
      await Tought.update(tought, {where: {id: id}})
    
      req.flash('message', 'Pensamento atualizado com sucesso!')

      req.session.save(() => {
        res.redirect('/toughts/dashboard')
      })
    } catch(err) {
      console.log(`Erro inesperado: ${err}`)
    }
  }
}