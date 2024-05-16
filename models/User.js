const { DataTypes } = require('sequelize') // Importando os tipos de dados do Sequelize
const db            = require('../db/conn') // Importando conexão com o banco de dados

// Tabela
const User = db.define('User', {
  nome: {
    type: DataTypes.STRING,
    require: true
  },
  email: {
    type: DataTypes.STRING,
    require: true
  },
  senha: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false
  }
})

module.exports = User