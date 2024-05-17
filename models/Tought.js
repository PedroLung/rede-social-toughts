const { DataTypes } = require('sequelize') // Importando os Datatypes do sequelize
const db            = require('../db/conn') // Importando a conexão com o banco de dados
// Chamar o model user:
const User = require('./User')

// Tabela:
const Tought = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  }
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought