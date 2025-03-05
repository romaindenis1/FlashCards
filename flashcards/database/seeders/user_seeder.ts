import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Création de users
    await User.createMany([
      { username: 'user', password: 'user', isAdmin: false },
      { username: 'admin', password: 'admin', isAdmin: true },
    ])
  }
}
