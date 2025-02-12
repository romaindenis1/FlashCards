import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

export default class AuthController {
  public async loginWithJwt({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)

    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
      expiresIn: '1h',
    })

    return response.json({ token })
  }
}
