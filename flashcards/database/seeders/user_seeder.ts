import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Hash from '@adonisjs/core/services/hash'
export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { username: 'user' },
      {
        username: 'user',
        password: await Hash.make('password'),
        isAdmin: false,
      }
    )
  }
}
