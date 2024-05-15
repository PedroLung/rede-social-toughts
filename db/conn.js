const { Sequelize } = require('sequelize') // Importando o Sequelize
// Realizando a conexão com o banco de dados: (nome do banco, usuario, senha, definir o host e o dialeto)
const sequelize = new Sequelize('toughts', 'root', 'marte135', {
  host: 'localhost',
  dialect: 'mysql'
})
// Fazer a autenticação do banco de dados
try {
  sequelize.authenticate() // Comando para autenticar
  console.log('Banco de dados conectado com sucesso') // Mensagem de sucesso
}catch(err){ 
  console.log(`Não foi possível se conectar: ${err}`) // Mensagem de erro
}

module.exports = sequelize // exportando a conexão com o banco de dados