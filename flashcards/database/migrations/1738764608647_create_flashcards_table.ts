import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Flashcards extends BaseSchema {
  protected tableName = 'flashcards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('question').notNullable()
      table.string('answer').notNullable()
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
