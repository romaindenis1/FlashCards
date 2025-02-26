import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async connect({ request, response }: HttpContext) {
    const username = request.input('username')
    const password = request.input('password')

    // Check if the user already exists based on the username
    const user = await User.query().where('username', username).first()

    // If the user doesn't exist, create a new user (register)
    if (!user) {
      const hashedPassword = await Hash.make(password) // Hash password before saving
      await User.create({
        username: username,
        password: hashedPassword,
      })

      return response.redirect('/login') // Redirect to login after registration
    }

    // If the user exists, check if the password matches
    const passwordMatch = await Hash.verify(user.password, password)

    if (!passwordMatch) {
      return response.badRequest('Invalid password') // Password doesn't match
    }

    // User is authenticated, proceed to login logic (you could set a session, etc.)
    return response.redirect('/home') // Redirect to a dashboard or a logged-in page
  }
}
