import { BaseModel, column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import Deck from '#models/deck'

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public question!: string

  @column()
  public answer!: string

  @column()
  public deck_id!: number

  @belongsTo(() => Deck)
  public deck!: BelongsTo<typeof Deck>
}
