import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Deck from './deck.js'

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public question!: string

  @column()
  public answer!: string

  @column()
  public deck_id!: number

  // Correctly set the belongsTo relationship with Deck
  @belongsTo(() => Deck)
  public deck!: Deck // Directly typing this as Deck is enough, Adonis handles the internal type
}
