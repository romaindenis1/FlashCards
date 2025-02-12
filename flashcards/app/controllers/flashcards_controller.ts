import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'

export default class FlashcardsController {
  public async index({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    const flashcards = await Flashcard.query().where('deck_id', deck.id)
    return view.render('pages/deck', { deck, flashcards })
  }

  public async create({ params, view }: HttpContext) {
    return view.render('pages/new_card', { deck_id: params.deck_id })
  }

  public async store({ request, response, session, params }: HttpContext) {
    const { question, answer } = request.only(['question', 'answer'])

    if (question.length < 3) {
      session.flash({ error: 'La question est trop courte.' })
      return response.redirect().back()
    }

    if (answer.length < 1) {
      session.flash({ error: 'Il faut donner une réponse.' })
      return response.redirect().back()
    }

    const existingCard = await Flashcard.query()
      .where('deck_id', params.deck_id)
      .where('question', question)
      .first()

    if (existingCard) {
      session.flash({ error: 'Cette question existe déjà dans ce deck.' })
      return response.redirect().back()
    }

    await Flashcard.create({ question, answer, deckId: params.deck_id })
    return response.redirect(`/pages/deck/${params.deck_id}`)
  }

  public async edit({ params, view }: HttpContext) {
    const flashcard = await Flashcard.find(params.id)
    return view.render('pages/edit_card', { flashcard })
  }

  public async update({ params, request, response }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    flashcard.merge(request.only(['question', 'answer']))
    await flashcard.save()
    return response.redirect(`/pages/deck/${flashcard.deckId}`)
  }

  public async destroy({ params, response }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    await flashcard.delete()
    return response.redirect().back()
  }
}
