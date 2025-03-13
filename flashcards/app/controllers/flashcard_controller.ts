// app/Controllers/Http/FlashcardsController.ts
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'
import DecksController from './deck_controller.js'

export default class FlashcardsController {
  public async store({ request, response, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const deck = await Deck.findOrFail(params.deckId)

    const flashcard = await Flashcard.create({
      question,
      answer,
      deckId: deck.id, // Associate flashcard with the deck
    })

    return response.redirect().toRoute('decks.show', { id: deck.id }) // Redirect to the deck's page after adding flashcard
  }

  public async index({ params, response, view }: HttpContext) {
    try {
      const deckId = params.id
      const flashcards = await Flashcard.query().where('deck_id', deckId) // Get flashcards for this deck

      return view.render('decks/show', { flashcards, deckId })
    } catch (error) {
      return response.status(500).json({ message: 'Error retrieving flashcards' })
    }
  }
}
