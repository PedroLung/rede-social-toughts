const User = require('../models/User') // Importando o model User
const bcrypt = require('bcryptjs') // Importando o módulo bcriptjs para deixar as senhas seguras

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    const {email, password} = req.body

    // Verificar se o usuario existe
    const user = await User.findOne({ where: {email: email}})
    
    if (!user) {
      req.flash('message', 'Usuário não encontrado!')
      res.render('auth/login')

      return
    }

    // Checar se a senha bate com o que está cadastrado no banco
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if(!passwordMatch){
      req.flash('message', 'Senha Inválida!')
      res.render('auth/login')

      return
    }

    // Iniciar uma sessão
    req.session.userid = user.id

    req.flash('message', 'Login realizado com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const {name, email, password, confirmpassword} = req.body

    // password match validation
    if(password != confirmpassword) {
      // mensagem
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')

      return
    }

    // check if user exist
    const checkUserExists = await User.findOne({ where: {email: email} })
    // Tratamento de erro usando o flash message
    if (checkUserExists) {
      req.flash('message', 'O usuário já está cadastrado')
      res.render('auth/register')

      return
    }

    // Criptografando a senha, para salva-la criptografada ao banco de dados (segurança)
    const salt = bcrypt.genSaltSync(10) // Definindo a criptografia
    const hashedPassword = bcrypt.hashSync(password, salt) // Criptografando a senha

    // Salvando os dados pegos no formulário no objeto user
    const user = {
      name,
      email,
      password: hashedPassword
    }

    // Criar usuário no banco:
    try {
      const createdUser = await User.create(user) // Cadastrando o usuario usando os dados fornecidos pelo objeto user

      // Inicializar a sessão
      req.session.userid = createdUser.id

      req.flash('message', 'Cadastro realizado com sucesso!') // Flash message para sinalizar que foi realizado o cadastro

      // Salvando a sessão para que o usuario permaneça logado
      req.session.save(() => {
        res.redirect('/') // redirecionando para a home
      })
    } catch (err) {
      console.log(`Erro inesperado: ${err}`)
    }
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}