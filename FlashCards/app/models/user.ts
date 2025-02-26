import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public username!: string

  @column()
  public password!: string
}
