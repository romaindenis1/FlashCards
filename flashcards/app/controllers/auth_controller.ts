import type { HttpContext } from '@adonisjs/core/http'

import User from 'App/Models/User'
import Hash from '@adonis/core/hash' //All of these are wrong i odn't know why

export default class AuthController {
  // Inscription d'un utilisateur
  public async register({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create({ ...data, password: await Hash.make(data.password) })
    return response.created(user)
  }

  // Connexion et génération du token
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)
    return response.ok({ token })
  }
}
