import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'

export default class DecksController {
  public async index({ auth, response, view }: HttpContext) {
    const user = auth.user ?? { id: 0 }
    if (!user) {
      throw new Error('User not authenticated')
    }
    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }
    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }
    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }
    const decks = await Deck.query().where('userId', user.id)
    return view.render('pages/my_decks', { decks })
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/new_deck')
  }

  public async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user
    const { title: name, description } = request.only(['title', 'description'])

    if (!name || name.length < 3) {
      session.flash({ error: 'Le titre doit contenir au moins 3 caractères.' })
      return response.redirect().back()
    }

    const existingDeck = await Deck.query().where('userId', user.id).where('title', name).first()
    if (existingDeck) {
      session.flash({ error: 'Ce deck existe déjà.' })
      return response.redirect().back()
    }

    await Deck.create({ title: name, description, user_id: user.id })
    return response.redirect('/pages/my_decks')
  }

  public async edit({ params, view }: HttpContext) {
    const deck = await Deck.find(params.id)
    return view.render('pages/edit_deck', { deck })
  }

  public async update({ params, request, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    deck.merge(request.only(['title', 'description']))
    await deck.save()
    return response.redirect('/pages/my_decks')
  }

  public async destroy({ params, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()
    return response.redirect('/pages/my_decks')
  }
}
