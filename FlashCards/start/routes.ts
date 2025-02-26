/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Route from '@adonisjs/core/services/router'

//Pages
Route.get('/', async ({ view }: { view: any }) => {
  return view.render('pages/home')
})

Route.get('/connect', async ({ view }: { view: any }) => {
  return view.render('pages/connect')
})

Route.get('/register', async ({ view }: { view: any }) => {
  return view.render('pages/register')
})

Route.get('/pages/flashcards', async ({ view }: { view: any }) => {
  return view.render('pages/flashcards')
})

//Authentication
Route.post('/connect', 'AuthController.loginWithJwt')
Route.post('/register', 'AuthController.connect')

//Decks et flashcards
//Route.group(() => {
Route.get('/pages/my_decks', 'DecksController.index')
Route.get('/pages/deck/:id', 'FlashcardsController.index')
Route.get('/pages/deck/:id/edit', 'DecksController.edit')
Route.get('/pages/deck/:deck_id/new', 'FlashcardsController.create')

Route.post('/decks', 'DecksController.store')
Route.post('/flashcards/:deck_id', 'FlashcardsController.store')

Route.get('/flashcards/:id/edit', 'FlashcardsController.edit')
Route.put('/flashcards/:id', 'FlashcardsController.update')
Route.delete('/flashcards/:id', 'FlashcardsController.destroy')

Route.put('/decks/:id', 'DecksController.update')
Route.delete('/decks/:id', 'DecksController.destroy')
//}).middleware('auth') FOR LATER
