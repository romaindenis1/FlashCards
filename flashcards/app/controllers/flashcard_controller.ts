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
  public async validateFlashcard({ params, response }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    flashcard.validated = true // Assuming you have a 'validated' boolean field
    await flashcard.save()

    return response.redirect().toRoute('decks.show', { id: params.deckId })
  }
  public async edit({ params, view }: HttpContext) {
    const flashcard = await Flashcard.query().where('id', params.id).firstOrFail()
    const deckId = params.deckId
    return view.render('flashcards/edit', { flashcard, deckId })
  }
  public async destroy({ params, response }: HttpContext) {
    try {
      const deckId = params.deckId
      const flashcardId = params.flashcardId

      // Log the IDs for debugging purposes
      console.log('Deck ID:', deckId)
      console.log('Flashcard ID:', flashcardId)

      // Find the flashcard by its ID
      const flashcard = await Flashcard.findOrFail(flashcardId)

      // Ensure the flashcard belongs to the specified deck
      if (flashcard.deckId !== parseInt(deckId)) {
        return response
          .status(400)
          .json({ success: false, message: 'Flashcard does not belong to this deck.' })
      }

      // Delete the flashcard
      await flashcard.delete()

      // After deletion, redirect back to the deck's page
      return response.json({ success: true, message: 'Flashcard deleted successfully' })
    } catch (error) {
      console.error('Error deleting flashcard:', error)
      return response.status(400).json({ success: false, message: 'Failed to delete flashcard' })
    }
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const flashcard = await Flashcard.findOrFail(params.id)

      flashcard.question = request.input('question')
      flashcard.answer = request.input('answer')

      await flashcard.save()

      return response.json({ success: true, message: 'Flashcard updated successfully' }) // Send success response
    } catch (error) {
      return response.status(400).json({ success: false, message: 'Failed to update flashcard' }) // Send failure response
    }
  }
}
