import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_teacher'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('gender', 1).notNullable().defaultTo('W') // Valeur par défaut W for woman
      table.string('lastname').notNullable()
      table.string('nickname').notNullable()
      table.string('origine').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
