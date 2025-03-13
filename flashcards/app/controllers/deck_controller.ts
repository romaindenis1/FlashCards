// app/Controllers/Http/DecksController.ts
import Deck from '#models/deck' // Import the Deck model
import Flashcard from '#models/flashcard' // Import the Flashcard model
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  // Fetch all decks
  public async index({ view }: HttpContext) {
    const decks = await Deck.query().preload('flashcards') // Load flashcards relation
    return view.render('pages/home', { decks })
  }

  // Show the form to create a new deck or handle it
  public async create({ view }: HttpContext) {
    return view.render('decks/create') // Render the deck creation view
  }

  public async show({ params, response, view }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id) // Find deck
      const flashcards = await Flashcard.query().where('deck_id', deck.id) // Get its flashcards

      return view.render('decks/show', { deck, flashcards }) // Pass both deck & flashcards
    } catch (error) {
      return response.status(404).json({ message: 'Deck not found' })
    }
  }

  // Store a new deck (with validation for description length)
  public async store({ request, response }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])

    // Check if the description is less than 10 characters
    if (description.length < 10) {
      // If the description is too short, redirect to the homepage
      return response.redirect('/')
    }

    // Check if a deck with the same name already exists
    const existingDeck = await Deck.query().where('name', name).first()

    if (existingDeck) {
      // If a deck with the same name exists, redirect to the homepage
      return response.redirect('/decks')
    }

    // Create the new deck if it passes validation
    await Deck.create({
      name,
      description,
    })

    // Redirect to the homepage after creating the deck
    return response.redirect('/decks')
  }

  // Show the form to edit a deck's title and description
  public async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    return view.render('decks/edit', { deck })
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      const { name, description } = request.only(['name', 'description'])

      // Validate the input fields
      if (!name || !description) {
        return response.status(400).json({ message: 'Name and description are required' })
      }

      // Update the deck
      deck.name = name
      deck.description = description
      await deck.save()

      // Return a JSON response indicating success
      return response.json({ success: true, deck })
    } catch (error) {
      console.log('Error updating deck:', error)
      return response.status(500).json({ success: false, message: 'Error updating deck' })
    }
  }

  public async destroy({ params, response, view }: HttpContext) {
    // Try to find the deck by ID
    const deck = await Deck.find(params.id)

    if (!deck) {
      // Return an error if deck is not found
      return response.status(404).json({ message: 'Deck not found' })
    }

    // Attempt to delete the deck
    try {
      await deck.delete()

      // Redirect the user after successful deletion
      return view.render('pages/home') // You can redirect to another page, like the list of all decks
    } catch (error) {
      // Handle the error and send a message if deletion fails
      console.log('Error deleting deck:', error)
      return response.status(500).json({ message: 'Error deleting deck' })
    }
  }

  // Store a new flashcard in the deck
  public async storeFlashcard({ params, request, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    const { question, answer } = request.only(['question', 'answer'])

    // Create a new flashcard and associate it with the deck
    await Flashcard.create({
      deckId: deck.id,
      question,
      answer,
    })

    // Redirect back to the deck's page after adding the flashcard
    return response.redirect(`/decks/${params.id}`)
  }
}
