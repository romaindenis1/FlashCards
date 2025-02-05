/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Route from '@adonisjs/core/services/router'

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.resource('/decks', 'DecksController').apiOnly().middleware('auth')
  Route.resource('/flashcards', 'FlashcardsController').apiOnly().middleware('auth')
}).prefix('/api')
