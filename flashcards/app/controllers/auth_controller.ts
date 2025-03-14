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
      const { username, userpassword } = request.all();
      console.log('Login attempt:', { username, userpassword });
  
      // Ensure username and password are provided
      if (!username || !userpassword) {
        return response.badRequest('Nom d\'utilisateur ou mot de passe manquant');
      }
  
      // Proceed with the login logic
      const user = await User.query().where('username', username).first();
      if (!user) {
        console.log('User not found');
        return response.badRequest('Nom d\'utilisateur ou mot de passe incorrect');
      }
  
      // Check if the password matches the hashed password in the database
      const isPasswordValid = await Hash.verify(userpassword.trim(), user.password);
      if (!isPasswordValid) {
        console.log('Invalid password');
        return response.badRequest('Nom d\'utilisateur ou mot de passe incorrect');
      }
  
      // Log the user in
      await auth.use('web').login(user);
      console.log('User logged in successfully:', user.username);
      return response.redirect('/');
    } catch (error) {
      console.error('Something went wrong:', error);
      return response.internalServerError('Something went wrong, please try again.');
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
  public async handleRegister({ request, response }: HttpContext) {
    try {
      console.log("🔹 Received register request:", request.all());
  
      // Validate input
      const payload = await request.validateUsing(registerUserValidator);
      console.log("✅ Validation passed:", payload);
  
      // Check if user already exists
      const existingUser = await User.findBy('username', payload.username);
      if (existingUser) {
        console.error("❌ User already exists:", payload.username);
        return response.badRequest({ error: "Username already taken" });
      }
  
      
  
      console.log("✅ User created successfully:", payload.username);
      console.log("Password :" + payload.userpassword);

      // Hash password and create user
      const hashedPassword = await Hash.make(payload.userpassword);
      console.log("🔹 Hashed password created");
  
      const user = await User.create({
        username: payload.username,
        password: hashedPassword
      });
      // Redirect to login or home
      return response.redirect().toRoute('home');
    } catch (error) {
      console.error("❌ Error in handleRegister:", error);
      return response.internalServerError({ error: "Something went wrong" });
    }
  }
  async handleRegisterView({ view }: HttpContext) {
    console.log('Rendering register view...');
    
    return view.render('register');
  }
}
