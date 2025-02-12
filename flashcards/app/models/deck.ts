import { BaseModel, column, belongsTo, hasMany, HasMany, BelongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Flashcard from '#models/flashcard'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public title!: string

  @column()
  public description?: string

  @column()
  public user_id!: number

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @hasMany(() => Flashcard)
  public flashcards!: HasMany<typeof Flashcard>
}
