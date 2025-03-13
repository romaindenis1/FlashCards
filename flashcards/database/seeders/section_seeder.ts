import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Section from '#models/deck'
import { faker } from '@faker-js/faker'

export default class SectionSeeder extends BaseSeeder {
  public async run() {
    // Création de sections avec des données aléatoires
    await Section.createMany([
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
      { name: faker.commerce.department(), description: faker.lorem.sentence() },
    ])
  }
}
