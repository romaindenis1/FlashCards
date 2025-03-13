import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */
  async handleLogin({ request, auth, session, response }: HttpContext) {
    try {
      // Validate user input
      const payload = await loginUserValidator.validate(request.all())

      // Find user by username
      const user = await User.findBy('username', payload.username)
      if (!user) {
        session.flash('error', 'Nom d\'utilisateur ou mot de passe incorrect')
        return response.redirect().toRoute('home')
      }

      // Verify password
      const isPasswordValid = await Hash.verify(user.password, payload.userpassword)
      if (!isPasswordValid) {
        session.flash('error', 'Nom d\'utilisateur ou mot de passe incorrect')
        return response.redirect().toRoute('home')
      }

      // Log in user
      await auth.use('web').login(user)
      session.flash('success', "Connexion réussie")
      return response.redirect().toRoute('home')

    } catch (error) {
      console.error('Erreur de connexion:', error)
      session.flash('error', 'Une erreur est survenue lors de la connexion')
      return response.redirect().toRoute('home')
    }
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async handleLogout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', "Déconnexion réussie")
    return response.redirect().toRoute('home')
  }

  /**
   * Gérer l'inscription d'un utilisateur
   */
  async handleRegister({ request, auth, session, response }: HttpContext) {
    try {
      // Validate user input
      const payload = await registerUserValidator.validate(request.all())

      // Ensure password is provided (fix for undefined error)
      if (!payload.userPassword) {
        session.flash('error', 'Le mot de passe est requis')
        return response.redirect().toRoute('home')
      }

      // Hash the password
      const hashedPassword = await Hash.make(payload.userPassword)

      // Check if username already exists
      const existingUser = await User.findBy('username', payload.username)
      if (existingUser) {
        session.flash('error', "Le nom d'utilisateur existe déjà.")
        return response.redirect().toRoute('home')
      }

      // Create new user
      const user = await User.create({
        username: payload.username,
        password: hashedPassword,
      })

      // Log in user automatically after registration
      await auth.use('web').login(user)
      session.flash('success', "Inscription et connexion réussies")
      return response.redirect().toRoute('home')

    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      session.flash('error', "Une erreur est survenue lors de l'inscription.")
      return response.redirect().toRoute('home')
    }
  }
}
