import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSectionsTable extends BaseSchema {
  protected tableName = 't_section'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
