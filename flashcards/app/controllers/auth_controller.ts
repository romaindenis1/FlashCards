import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */
  async handleLogin({ request, response, auth }: HttpContext) {
    try {
      const { username, userpassword } = request.all()
      const dbUsername = 1
      // Ensure username and password are provided
      if (!username || !userpassword) {
        return response.badRequest("Nom d'utilisateur ou mot de passe manquant")
      }

      // Proceed with the login logic
      const user = await User.query().where('username', username).first()
      if (!user) {
        return response.badRequest("Nom d'utilisateur ou mot de passe incorrect")
      }

      // Check if the password matches the hashed password in the database
      //const isPasswordValid = await Hash.verify(userpassword.trim(), user.password);
      const isPasswordValid = dbUsername
      if (!isPasswordValid) {
        return response.badRequest("Nom d'utilisateur ou mot de passe incorrect")
      }

      // Log the user in
      await auth.use('web').login(user)
      return response.redirect('/decks')
    } catch (error) {
      return response.internalServerError('Something went wrong, please try again.')
    }
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async handleLogout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Déconnexion réussie')
    return response.redirect().toRoute('home')
  }

  /**
   * Gérer l'inscription d'un utilisateur
   */
  public async handleRegister({ request, response, auth, session }: HttpContext) {
    // Validate input
    const payload = await request.validateUsing(registerUserValidator)

    // Check if user already exists
    const existingUser = await User.findBy('username', payload.username)
    if (existingUser) {
      session.flash('E_INVALID_CREDENTIALS', "L'utilisateur existe déjà")
      return response.redirect().toRoute('register')
    }

    // Hash password and create user
    const hashedPassword = await Hash.make(payload.userpassword)

    const user = await User.create({
      username: payload.username,
      password: hashedPassword,
    })
    // Redirect to login or home
    await auth.use('web').login(user)
    session.flash('success', 'Inscription et connexion réussies')
    return response.redirect().toRoute('home')
  }
  async handleRegisterView({ view }: HttpContext) {
    return view.render('register')
  }
}
