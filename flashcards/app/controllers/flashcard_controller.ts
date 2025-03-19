// app/Controllers/Http/FlashcardsController.ts
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { HttpContext } from '@adonisjs/core/http'
import DecksController from './deck_controller.js'

export default class FlashcardsController {
  async store({ request, response, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const deckId = params.deckId

    const flashcard = await Flashcard.create({
      question,
      answer,
      deckId: deckId,
    })

    response.redirect().toRoute('decks.show', { id: deckId })
  }

  async update({ request, response, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])
    const cardId = params.cardId

    const flashcard = await Flashcard.findOrFail(cardId)
    flashcard.question = question
    flashcard.answer = answer
    await flashcard.save()

    response.redirect().toRoute('decks.show', { id: flashcard.deckId })
  }

  async destroy({ params, response }: HttpContext) {
    const cardId = params.cardId

    const flashcard = await Flashcard.findOrFail(cardId)
    await flashcard.delete()

    response.redirect().toRoute('decks.show', { id: flashcard.deckId })
  }
}
