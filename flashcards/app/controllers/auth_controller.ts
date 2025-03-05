import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

/**
 * Controller pour l'authentification
 */
export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */
  async handleLogin({ request, auth, session, response }: HttpContext) {
    // Récupère les données validées
    const { username, password } = await request.validateUsing(loginUserValidator)

    // Récupère l'utilisateur correspondant aux données saisies par l'utilisateur
    const user = await User.verifyCredentials(username, password)

    // Utilise le guard 'web' pour connecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').login(user)

    // Affiche un msg à l'utilsateur
    session.flash('success', "L'utilisateur s'est connecté avec succès")

    // Redirige vers la route ayant pour nom 'home'
    return response.redirect().toRoute('home')
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async handleLogout({ auth, session, response }: HttpContext) {
    // Utilise le Guard 'web' pour déconnecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').logout()

    // Affiche un message à l'utilisateur
    session.flash('success', "L'utilisateur s'est déconnecté avec succès")

    // Redirige la réponse sur la route 'home'
    return response.redirect().toRoute('home')
  }

  /**
   * Gérer l'inscription d'un utilisateur
   */
  async handleRegister({ request, auth, session, response }: HttpContext) {
    try {
      // Validate user input
      const payload = await request.validate({ schema: registerUserValidator })

      // Check if the username already exists in the database before creating the user
      const existingUser = await User.query().where('username', payload.username).first()

      if (existingUser) {
        // If the username already exists, flash an error and redirect to the register page
        session.flash('error', "Le nom d'utilisateur existe déjà.")
        return response.redirect().toRoute('register')
      }

      // Proceed to create the user only if the username does not exist
      const user = await User.create({
        username: payload.username,
        password: payload.password,
      })

      // Log the user in after successful creation
      await auth.use('web').login(user)

      // Flash a success message and redirect to the home page
      session.flash('success', "L'utilisateur s'est inscrit et connecté avec succès")
      return response.redirect().toRoute('home')
    } catch (error) {
      // Catch unexpected errors and log them for debugging
      console.error(error)
      session.flash('error', "Une erreur est survenue lors de l'inscription.")
      return response.redirect().toRoute('register')
    }
  }
}
