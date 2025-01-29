// helps catch common coding errors
'use strict'

// Import schema class from adonis
const Schema = use('Schema')

class CardsSchema extends Schema {
  // Quand node ace migration:run
  up() {
    this.create('cards', (table) => {
      table.increments()
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE') // foreign key
      table.text('question').notNullable()
      table.text('answer').notNullable()
      table.timestamps() // created_at and updated_at
    })
  }
  // Quand node ace migration:rollback
  down() {
    this.drop('cards')
  }
}

// Export as a module
module.exports = CardsSchema
