import type { HttpContext } from '@adonisjs/core/http'

import Flashcard from '#models/flashcard'

export default class FlashcardsController {
  // Récupérer toutes les flashcards d'un deck
  public async index({ params }: HttpContext) {
    return await Flashcard.query().where('deck_id', params.deck_id)
  }

  // Créer une nouvelle flashcard dans un deck
  public async store({ request, params }: HttpContext) {
    const data = request.only(['question', 'answer'])
    return await Flashcard.create({ ...data, deck_id: params.deck_id })
  }

  // Récupérer une flashcard spécifique
  public async show({ params }: HttpContext) {
    return await Flashcard.findOrFail(params.id)
  }

  // Mettre à jour une flashcard
  public async update({ params, request }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    flashcard.merge(request.only(['question', 'answer']))
    await flashcard.save()
    return flashcard
  }

  // Supprimer une flashcard
  public async destroy({ params }: HttpContext) {
    const flashcard = await Flashcard.findOrFail(params.id)
    await flashcard.delete()
  }
}
