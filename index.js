const express   = require('express') // Importando o express
const exhbs     = require('express-handlebars') // Importando o handlebars 
const session   = require('express-session') // Importando as sessions
const FileStore = require('session-file-store')(session) // Importando o file store
const flash     = require('express-flash') // Importando o flash message
// Inicializar o express
const app = express()
// Importando a conexão com o banco de dados
const conn = require('./db/conn')
// Definir porta
const port = 3000



// Chamar a aplicação:
conn 
  .sync() // Sincronizar o banco com a aplicação
  .then(() => {
    // Inicializando a aplicação na porta 3000
    app.listen(port, ()=> {
      console.log('Servidores a todo vapor meu patrão')
      console.log(`Estamos rodando na porta ${port}`)
    })
  })
  .catch((err) => console.log(`Não foi possível inicializar os servidores: ${err}`)) // Mensagem de erro
