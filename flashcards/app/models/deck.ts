// app/Models/Deck.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Flashcard from '#models/flashcard' // Import the Flashcard model

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string // Add description for the deck (optional)

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Flashcard)
  declare flashcards: HasMany<typeof Flashcard> // Relationship with Flashcards
}
