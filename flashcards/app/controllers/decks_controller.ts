import type { HttpContext } from '@adonisjs/core/http'

import Deck from '#models/deck'

export default class DecksController {
  // Récupérer les decks de l'utilisateur connecté
  public async index({ auth }: HttpContext) {
    return await Deck.query().where('user_id', auth.user!.id)
  }

  // Créer un nouveau deck
  public async store({ request, auth }: HttpContext) {
    const data = request.only(['title'])
    return await Deck.create({ ...data, user_id: auth.user!.id })
  }

  // Récupérer un deck spécifique
  public async show({ params }: HttpContext) {
    return await Deck.findOrFail(params.id)
  }

  // Mettre à jour un deck
  public async update({ params, request }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    deck.merge(request.only(['title']))
    await deck.save()
    return deck
  }

  // Supprimer un deck
  public async destroy({ params }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()
  }
}
