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
// Definir os arquivos estáticos
app.use(express.static('public'))
// Definir o tamplate engine e a view engine
app.engine('hanglebars', exhbs.engine())
app.set('view engine', 'handlebars')
// Receber resposta do body (normalmente em formulário)
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json)
// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  })
)
// Flash message
app.use(flash())
//set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})
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
