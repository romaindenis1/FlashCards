import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

export default class AuthController {
  // Register a new user
  public async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'username'])

    // Validate user data (you can add validation rules here if needed)
    if (!data.email || !data.password || !data.username) {
      return response.badRequest({ error: 'All fields are required' })
    }

    // Check if email is already taken
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.conflict({ error: 'Email is already in use' })
    }

    // Create a new user
    const user = await User.create({
      email: data.email,
      username: data.username,
      password: data.password,
    })

    return response.created({ user })
  }

  // Login with JWT
  public async loginWithJwt({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Find the user by email
    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ error: 'Invalid credentials' })
    }

    // Verify the password
    const isValidPassword = await hash.verify(user.password, password)
    if (!isValidPassword) {
      return response.unauthorized({ error: 'Invalid credentials' })
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      'your_jwt_secret_key', // Replace with your actual secret key
      { expiresIn: '1h' }
    )

    return response.ok({ token, user })
  }
}
