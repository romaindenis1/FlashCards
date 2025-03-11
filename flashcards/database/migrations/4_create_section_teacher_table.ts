import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSectionTeacherTable extends BaseSchema {
  protected tableName = 'section_teacher'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('section_id')
        .unsigned()
        .references('id')
        .inTable('t_section')
        .onDelete('CASCADE')
      table
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('t_teacher')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
