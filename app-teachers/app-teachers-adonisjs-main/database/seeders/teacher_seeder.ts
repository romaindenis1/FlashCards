import { TeacherFactory } from '#database/factories/teacher_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Teacher from '#models/teacher'

export default class extends BaseSeeder {
  async run() {
    // Création d'enseignants
    await Teacher.createMany([
      {
        gender: 'M',
        lastname: 'Charmier',
        nickname: 'GregLeBarbar',
        origine: "Plateforme de jeux d'échecs",
      },
      {
        gender: 'M',
        lastname: 'Carrel',
        nickname: 'XCL',
        origine: 'Sigle ETML',
      },
      {
        gender: 'W',
        lastname: 'Curchod',
        nickname: 'ACD',
        origine: 'Sigle ETML',
      },
    ])

    // Appel la factory pour créer 10 enseignants
    await TeacherFactory.createMany(10)
  }
}
