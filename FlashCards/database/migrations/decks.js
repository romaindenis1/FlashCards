// helps catch common coding errors
'use strict'

// Import schema class from adonis
const Schema = use('Schema')

class DecksSchema extends Schema {
  // Quand node ace migration:run
  up() {
    this.create('decks', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('description').nullable()
      table.timestamps()
    })
  }
  // Quand node ace migration:rollback
  down() {
    this.drop('decks')
  }
}

// Export as a module
module.exports = DecksSchema
