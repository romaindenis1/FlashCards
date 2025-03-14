/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/

import AuthController from '#controllers/auth_controller'
import TeachersController from '#controllers/flashcard_controller'
import SectionController from '#controllers/deck_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import Section from '#models/deck'
import DecksController from '#controllers/deck_controller'
import FlashcardsController from '#controllers/flashcard_controller'
// Route permettant d'accéder à la liste des enseignants (homepage)
router
  .get('/', async ({ view }) => {
    // Fetch all sections and preload their teachers
    const sections = await Section.query().preload('flashcards').exec()

    // Render the homepage view and pass sections to it
    return view.render('pages/home', { sections })
  })
  .as('home')

// Route permettant de voir les détails d'un enseignant
// Deck routes
router.get('/decks', [DecksController, 'index'])
router.get('/decks/create', [DecksController, 'create'])
router.post('/decks', [DecksController, 'store']).as('decks.store')
router.get('/decks/:id', [DecksController, 'show']).as('decks.show') // Show deck with options to edit, delete, and add flashcards
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit') // Show the edit page
router.put('/decks/:id', [DecksController, 'update']).as('decks.update') // Update deck

// Delete deck route
router.delete('/decks/:id', [DecksController, 'destroy']).as('decks.destroy') // Delete deck

// Flashcard routes
router.post('/decks/:deckId/flashcards', [FlashcardsController, 'store']).as('flashcards.store')

// Route permettant de se connecter
router
  .post('/login', [AuthController, 'handleLogin'])
  .as('auth.handleLogin')
  .use(middleware.guest())

// Route permettant de gérer l'inscription
router.post('/register', [AuthController, 'handleRegister']).as('auth.handleRegister')

// Route permettant de se déconnecter
router
  .post('/logout', [AuthController, 'handleLogout'])
  .as('auth.handleLogout')
  .use(middleware.auth())

router
  .get('/register', async ({ view }) => {
    return view.render('auth/register')
  })
  .as('auth.register')
