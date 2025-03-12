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
        // Manually retrieve the form data
        const { username, password } = request.all()
    
        // Ensure the username and password are provided
        if (!username || !password) {
          session.flash('error', 'Le nom d\'utilisateur et le mot de passe sont requis')
          return response.redirect().toRoute('home')
        }
    
        // Verify the user's credentials using the User model
        const user = await User.verifyCredentials(username, password)
    
        if (!user) {
          session.flash('error', 'Nom d\'utilisateur ou mot de passe incorrect')
          return response.redirect().toRoute('home')
        }
    
        // Log the user in using the 'web' guard
        await auth.use('web').login(user)
    
        // Flash a success message to the session
        session.flash('success', "L'utilisateur s'est connecté avec succès")
    
        // Redirect to the home page
        return response.redirect().toRoute('home')
    
      } catch (error) {
        console.error(error)
        session.flash('error', 'Une erreur est survenue lors de la connexion')
        return response.redirect().toRoute('home')
      }
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
        // Validate user input (without password validation)
        const payload = await registerUserValidator.validate(request.all())
    
        // Manually check if passwords match (since Vine won't validate them)
        if (payload.userPassword !== payload.confirmUserPassword) {
          session.flash('error', 'Les mots de passe ne correspondent pas')
          return response.redirect().toRoute('home')
        }
    
        // Hash the password
        const hashedPassword = await Hash.make(payload.userPassword)
    
        // Check if the username already exists in the database
        const existingUser = await User.query().where('username', payload.username).first()
        if (existingUser) {
          session.flash('error', "Le nom d'utilisateur existe déjà.")
          return response.redirect().toRoute('home')
        }
    
        // Create the user
        const user = await User.create({
          username: payload.username,
          password: hashedPassword,
        })
    
        // Log the user in after successful registration
        await auth.use('web').login(user)
    
        session.flash('success', "L'utilisateur s'est inscrit et connecté avec succès")
        return response.redirect().toRoute('home')
    
      } catch (error) {
        console.error(error)
        session.flash('error', "Une erreur est survenue lors de l'inscription.")
        return response.redirect().toRoute('home')
      }
    }
  } 