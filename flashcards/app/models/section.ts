import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'

export default class Section extends BaseModel {
  public static table = 't_section'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @manyToMany(() => Teacher, {
    pivotTable: 'section_teacher',
  })
  declare teachers: any // This can remain as Teacher[] because Adonis handles the relation internally

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
