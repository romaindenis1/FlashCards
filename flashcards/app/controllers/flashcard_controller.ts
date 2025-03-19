// app/Controllers/Http/FlashcardsController.ts
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'

export default class FlashcardsController {
  // This method will render the flashcard creation form
  public async index({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId) // Find the deck by ID
    return view.render('flashcards/create', { deck }) // Render the flashcard creation page and pass the deck data
  }

  // This method will handle the actual creation of a flashcard (form submission)
  public async create({ request, response, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const deck = await Deck.findOrFail(params.deckId) // Find the deck by ID

    // Create the flashcard
    const flashcard = await Flashcard.create({
      question,
      answer,
      deckId: deck.id, // Associate flashcard with the deck
    })

    // Redirect back to the deck's page after adding the flashcard
    return response.redirect().toRoute('decks.show', { id: deck.id })
  }

  // This method will handle displaying all the flashcards for a specific deck
  public async show({ params, view }: HttpContext) {
    const { deckId, id } = params

    // Find the deck by deckId
    const deck = await Deck.findOrFail(deckId)

    // Find the flashcard by id
    const flashcard = await Flashcard.findOrFail(id)

    // Return the flashcard data to the view
    return view.render('flashcards/show', { deck, flashcard })
  }
}
